"use client";

import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Button,
  Box,
  TextField,
  Paper,
  Container,
  CircularProgress,
  Chip,
  Tooltip,
  IconButton,
  useMediaQuery,
  Typography,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Dialog,
} from "@mui/material";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { GET_CUSTOMERS } from "../../../graphql/customer/query/customers";
import { useQuery, useMutation } from "@apollo/client";
import getApolloClient from "../../../lib/apolloClient";
import { useRouter } from "next/navigation";
import { DELETE_CUSTOMER_BY_ID } from "../../../graphql/customer/mutation/delete";
import Link from "next/link";
// import { motion } from "framer-motion"; // Sanfte Animationen
import { useDebounce } from "use-debounce"; // Verhindert häufige API-Anfragen
import { statusColors, tierLevels } from '../../../utils/constants/customer';

  const transformData = (data) => {
    return data.map((customer) => ({
      ...customer,
      tierLevel: customer.customer?.tierLevel,
      customerState: customer.customer?.customerState,
    }));
  };

export default function CustomerList({ initialData, token }) {
  console.log("initialData Debug:", initialData); // Debugging
  const router = useRouter();
  const [customers, setCustomers] = useState(transformData(initialData) || []);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    id: null,
    version: null,
  });

  const [search, setSearch] = useState("");
  /**
   * Dadurch wird nicht bei jedem Tastendruck eine neue Anfrage gesendet, 
   * sondern erst nach einer kurzen Verzögerung von 500ms.
   */
  const [debouncedSearch] = useDebounce(search, 500);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const isMobile = useMediaQuery("(max-width:600px)");

  const client = token ? getApolloClient(token) : getApolloClient(undefined);

  const {
    loading: queryLoading,
    error,
    data: queryData,
    refetch,
  } = useQuery(GET_CUSTOMERS, {
    client,
    variables: {
      filter: [{ field: "username", operator: "LIKE", value: debouncedSearch }],
    },
  });

  const [deleteCustomerMutation] = useMutation(DELETE_CUSTOMER_BY_ID, {
    client,
  });

  useEffect(() => {
    if (queryData?.customers) {
      console.log("🐞 DEBUG | Original API-Daten:", queryData.customers);

      const transformedData = queryData.customers.map((customer) => ({
        ...customer,
        tierLevel: customer.customer?.tierLevel ?? "0",
        customerState: customer.customer?.customerState ?? "UNKNOWN",
      }));

      console.log(
        "✅ DEBUG | Transformierte Daten für DataGrid:",
        transformedData
      );
      setCustomers(transformedData);
    }
  }, [queryData]);




  const columns = [
    { field: "id", headerName: "ID", width: isMobile ? 150 : 300 },
    {
      field: "username",
      headerName: "Benutzername",
      width: isMobile ? 120 : 140,
    },
    { field: "email", headerName: "Email", width: isMobile ? 180 : 210 },
    {
      field: "tierLevel",
      headerName: "Rang",
      width: 160,
      renderCell: (params) => {
        const tier = tierLevels[params.value] || {
          label: "Unbekannt",
          color: "#ddd",
        };
        return (
          <Chip
            label={tier.label}
            variant="outlined"
            sx={{
              color: tier.color,
              fontWeight: "bold",
              px: 2,
              borderColor: tier.color,
            }}
          />
        );
      },
    },
    {
      field: "customerState",
      headerName: "Status",
      width: 130,
      renderCell: (params) => {
        const status = statusColors[params.value] || {
          label: params.value,
          color: "default",
        };
        return (
          <Chip
            label={status.label}
            color={status.color}
            variant="outlined"
            sx={{ fontWeight: "bold" }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Aktionen",
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Anzeigen">
            <IconButton
              onClick={() => handleInspect(params.id)}
              sx={{ color: "#4E3792" }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bearbeiten">
            <IconButton
              onClick={() => handleEdit(params.id)}
              sx={{ color: "#FFA500" }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Löschen">
            <IconButton
              onClick={() => handleDeleteClick(params.id, params.row.version)}
              sx={{ color: "#D32F2F" }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const handleEdit = (id) => router.push(`/analytics/customers/${id}/edit`);
  const handleInspect = (id) => router.push(`/analytics/customers/${id}`);

  const handleDeleteClick = (id, version) => {
    setDeleteDialog({ open: true, id, version });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCustomerMutation({
        variables: { id: deleteDialog.id, version: deleteDialog.version },
      });
      await refetch();
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    } finally {
      setDeleteDialog({ open: false, id: null, version: null });
    }
  };

  if (error) {
    return (
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, textAlign: "center", color: "error.main" }}>
          <Typography variant="h6">Fehler beim Laden der Daten!</Typography>
          <Typography variant="body2">{error.message}</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => refetch()}>
            Erneut versuchen
          </Button>
        </Paper>
      </Container>
    );
  }

  
  return (
    <Box
      sx={{
        //flexGrow: 1,
        //    px: 3,
        py: 2,
        mt: 2,
        backgroundColor: "#F8F8FC",
        overflow: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Paper
          sx={{
            p: 2,
            mb: 3,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <TextField
            label="Suche nach Benutzername"
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mr: 2 }}
          />
          <Button
            variant="contained"
            sx={{
              ml: 2,
              backgroundColor: "#6A4BBC",
              "&:hover": { backgroundColor: "#4E3792" },
            }}
            startIcon={<Add />}
            component={Link}
            href={"/analytics/customers/create"}
          >
            Neuer Kunde
          </Button>
        </Paper>

        <Paper
          sx={{
            width: "100%",
            borderRadius: 2,
            boxShadow: 2,
            backgroundColor: "#fff",
          }}
        >
          {queryLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <CircularProgress sx={{ color: "#6A4BBC" }} />
            </Box>
          ) : (
            <DataGrid
              rows={customers || []}
              columns={columns}
              pagination
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[10, 25, 50]}
              slots={{ toolbar: GridToolbar }}
              sx={{
                borderRadius: 2,
                "& .MuiDataGrid-columnHeaders": {
                  //backgroundColor: "#6A4BBC",
                  backgroundColor: "#4E3792", // Dunkleres Lila für bessere Lesbarkeit
                  color: "#6A4BBC",
                  fontWeight: "bold",
                },
                "& .MuiDataGrid-row:nth-of-type(odd)": {
                  backgroundColor: "#F8F8FC",
                  // color: "#6A4BBC",
                  // backgroundColor: "#F8F8FC",
                },
                "& .MuiDataGrid-row:nth-of-type(even)": {
                  // backgroundColor: "#000",
                },
              }}
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
        <DialogTitle>Kunden löschen?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Möchtest du diesen Kunden wirklich löschen? Diese Aktion kann nicht
            rückgängig gemacht werden.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialog({ open: false, id: null, version: null })
            }
            color="primary"
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
