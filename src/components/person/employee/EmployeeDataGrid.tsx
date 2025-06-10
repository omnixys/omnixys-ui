"use client";

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
import { useRouter } from "next/navigation";
import Link from "next/link";
import getApolloClient from "../../../lib/apolloClient";
import { GET_EMPLOYEES } from "../../../graphql/customer/query/persons";
import { Person } from "../../../types/person/person.type";
import { DELETE_EMPLOYEE_BY_ID } from "../../../graphql/customer/mutation/delete";
import { createEmployeeColumns } from "./employeeColumns";
import EnhancedDataGrid from "../../EnhancedDataGrid";
import { Add } from "@mui/icons-material";

interface EmployeeDataGridProps {
  token: string;
}

interface EmployeeListItem {
  id: string;
  username: string;
  email: string;
  version: number;
  department: string;
  jobTitle: string;
}

interface DeleteDialogState {
  open: boolean;
  id: string | null;
  version: number | null;
}

export default function EmployeeDataGrid({ token }: EmployeeDataGridProps) {
  const router = useRouter();
  const client = getApolloClient(token);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [employees, setEmployees] = useState<EmployeeListItem[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    id: null,
    version: null,
  });

  const { loading, data, refetch } = useQuery<{ employees: Person[] }>(
    GET_EMPLOYEES,
    {
      client,
      variables: {
        filterInput: 
          { field: "username", operator: "LIKE", value: debouncedSearch },
      },
    }
  );

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE_BY_ID, { client });

  useEffect(() => {
    if (data?.employees) {
      const transformed: EmployeeListItem[] = data.employees.map((e) => ({
        id: e.id,
        username: e.username,
        email: e.email,
        version: e.version,
        department: e.employee?.department ?? "Unbekannt",
        jobTitle: e.employee?.jobTitle ?? "Unbekannt",
      }));
      setEmployees(transformed);
    }
  }, [data]);

  const handleInspect = (id: string | number) =>
    router.push(`/analytics/person/${id}?type=EMPLOYEE`);

  const handleEdit = (id: string | number) =>
    router.push(`/analytics/person/${id}/edit?type=EMPLOYEE`);


  const handleDeleteConfirm = async () => {
    if (!deleteDialog.id || deleteDialog.version === null) return;
    try {
      await deleteEmployee({
        variables: { id: deleteDialog.id, version: deleteDialog.version },
      });
      await refetch();
    } catch (err) {
      console.error("Löschfehler:", err);
    } finally {
      setDeleteDialog({ open: false, id: null, version: null });
    }
  };

  const theme = useTheme();
  const columns = createEmployeeColumns(
    theme,
    {
    onInspect: handleInspect,
    onEdit: handleEdit,
    onDelete: (id: string | number, version: number) => {
      const stringId = String(id); // falls du unbedingt einen String brauchst
      setDeleteDialog({ open: true, id: stringId, version });
    },
  });

  return (
    <Box
      sx={{
        py: 2,
        mt: 2,
        backgroundColor: (theme) => theme.palette.background.default,
        borderRadius: 1,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 2,
            mb: 3,
            display: "flex",
            alignItems: "center",
            boxShadow: 2,
          }}
        >
          <TextField
            label="Suche nach Benutzername"
            variant="outlined"
            fullWidth
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mr: 2,
              backgroundColor: (theme) => theme.palette.background.paper,
              borderRadius: 1,
              boxShadow: 1,
            }}
          />

          <Button
            startIcon={<Add />}
            variant="contained"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.main,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.secondary.main,
              },
            }}
            component={Link}
            href="/analytics/person/create?type=EMPLOYEE"
          >
            Neuer Mitarbeiter
          </Button>
        </Paper>

        <Typography
          variant="body2"
          sx={{ mt: 1, ml: 1, color: (theme) => theme.palette.secondary.main }}
        >
          {employees.length}{" "}
          {employees.length === 1 ? "Ergebnis" : "Ergebnisse"} gefunden
        </Typography>

        <Paper>
          {loading ? (
            <Box sx={{ textAlign: "center", p: 4 }}>
              <CircularProgress color="primary" />
            </Box>
          ) : (
            <EnhancedDataGrid<EmployeeListItem>
              rows={employees}
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
      >
        <DialogTitle sx={{ color: (theme) => theme.palette.secondary.main }}>
          Mitarbeiter löschen?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bist du sicher, dass du diesen Mitarbeiter löschen möchtest?
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
          >
            Löschen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
