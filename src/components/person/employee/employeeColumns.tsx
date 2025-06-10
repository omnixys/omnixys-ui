import { GridColDef } from "@mui/x-data-grid";
import { Box, IconButton, Theme, Tooltip } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";

interface ColumnHandlers {
  onInspect: (id: string | number) => void;
  onEdit: (id: string | number) => void;
  onDelete: (id: string | number, version: number) => void;
}

export const createEmployeeColumns = (
  theme: Theme,
  handlers: ColumnHandlers
): GridColDef[] => [
  { field: "id", headerName: "ID", width: 330 },
  { field: "username", headerName: "Benutzername", width: 160 },
  { field: "email", headerName: "E-Mail", width: 210 },
  { field: "department", headerName: "Abteilung", width: 160 },
  { field: "jobTitle", headerName: "Position", width: 160 },
  {
    field: "actions",
    headerName: "Aktionen",
    width: 160,
    sortable: false,
    renderCell: (params) => (
      <Box sx={{ display: "flex", gap: 1 }}>
        <Tooltip title="Anzeigen">
          <IconButton
            onClick={() => handlers.onInspect(params.id)}
            sx={(theme) => ({ color: theme.palette.secondary.main })}
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="Bearbeiten">
          <IconButton
            onClick={() => handlers.onEdit(params.id)}
            sx={(theme) => ({ color: theme.palette.primary.main })}
          >
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip title="Löschen">
          <IconButton
            onClick={() => handlers.onDelete(params.id, params.row.version)}
            sx={(theme) => ({ color: theme.palette.error.main })}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];
