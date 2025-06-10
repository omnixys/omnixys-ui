import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery, useMutation } from "@apollo/client";
import getApolloClient from "../../../lib/apolloClient";
import { useRouter } from "next/navigation";
import { GET_CUSTOMERS } from "../../../graphql/customer/query/persons";
import { DELETE_CUSTOMER_BY_ID } from "../../../graphql/customer/mutation/delete";
import Link from "next/link";
import { Add } from "@mui/icons-material";
import { CustomerListItem } from "../../../types/person/customer.type";
import { Person } from "../../../types/person/person.type";
import { createCustomerColumns } from "./CustomerColumns";
import EnhancedDataGrid from "../../EnhancedDataGrid";

interface CustomerDataGridProps {
  token: string;
}

interface DeleteDialogState {
  open: boolean;
  id: string | null;
  version: number | null;
}

export default function CustomerDataGrid({ token }: CustomerDataGridProps) {
  const router = useRouter();
  const client = getApolloClient(token);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [customers, setCustomers] = useState<CustomerListItem[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    id: null,
    version: null,
  });

  const { loading, error, data, refetch } = useQuery<{ customers: Person[] }>(
    GET_CUSTOMERS,
    {
      client,
      variables: {
        filterInput: 
          { field: "username", operator: "LIKE", value: debouncedSearch },
      },
    }
  );

  const [deleteCustomer] = useMutation(DELETE_CUSTOMER_BY_ID, { client });

  useEffect(() => {
    if (data?.customers) {
      const transformed: CustomerListItem[] = data.customers.map((person: Person) => ({
        id: person.id,
        version: person.version,
        username: person.username,
        email: person.email,
        tierLevel: person.customer?.tierLevel?.toString() ?? "0",
        customerState: person.customer?.customerState ?? "UNKNOWN",
      }));
      setCustomers(transformed);
    }
  }, [data]);

  const handleInspect = (id: string | number) =>
    router.push(`/analytics/person/${id}?type=CUSTOMER`);

  const handleEdit = (id: string | number) =>
    router.push(`/analytics/person/${id}/edit?type=CUSTOMER`);

  const handleDeleteClick = (id: string | number, version: number) => {
    const stringId = String(id); // falls du unbedingt einen String brauchst
    setDeleteDialog({ open: true, id: stringId, version });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.id || deleteDialog.version === null) return;

    try {
      await deleteCustomer({
        variables: {
          id: deleteDialog.id,
          version: deleteDialog.version,
        },
      });
      await refetch();
    } catch (err) {
      console.error("Löschfehler:", err);
    } finally {
      setDeleteDialog({ open: false, id: null, version: null });
    }
  };

  const theme = useTheme();
  const columns = createCustomerColumns(theme,{
    onInspect: handleInspect,
    onEdit: handleEdit,
    onDelete: handleDeleteClick,
  });

  if (error) {
    return (
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mt: 3, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Fehler beim Laden der Kunden
          </Typography>
          <Typography variant="body2">{error.message}</Typography>
          <Button onClick={() => refetch()} sx={{ mt: 2 }} variant="contained">
            Erneut versuchen
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        py: 2,
        mt: 2,
        borderRadius: 1,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 2,
            mb: 3,
            boxShadow: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <TextField
              label="Suche nach Benutzername"
              variant="outlined"
              size="small"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
                borderRadius: 1,
                boxShadow: 2,
                flex: 1,
              }}
            />

            <Button
              variant="contained"
              startIcon={<Add />}
              component={Link}
              href="/analytics/person/create?type=CUSTOMER"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                borderRadius: 2,
                px: 3,
                minHeight: 40,
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.main,
                },
              }}
            >
              Neuer Kunde
            </Button>
          </Box>
        </Paper>

        <Typography
          variant="body2"
          textAlign={{ xs: "center", sm: "left" }}
          sx={{ mt: 1, ml: 1, color: (theme) => theme.palette.secondary.main }}
        >
          {customers.length}{" "}
          {customers.length === 1 ? "Ergebnis" : "Ergebnisse"} gefunden
        </Typography>

        <Paper>
          {loading ? (
            <Box sx={{ textAlign: "center", p: 4 }}>
              <CircularProgress sx={{ color: "primary.main" }} />
            </Box>
          ) : (
            <EnhancedDataGrid<CustomerListItem>
              rows={customers}
              columns={columns}
            />
          )}
        </Paper>
      </Container>

      <Dialog
        open={deleteDialog.open}
        onClose={() =>
          setDeleteDialog({ open: false, id: null, version: null })
        }
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: 4,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            color: (theme) => theme.palette.secondary.main,
          }}
        >
          Kunden wirklich löschen?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Diese Aktion ist dauerhaft und kann nicht rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialog({ open: false, id: null, version: null })
            }
          >
            Abbrechen
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            sx={{ fontWeight: "bold" }}
          >
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
