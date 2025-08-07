import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, Chip, IconButton, Theme, Tooltip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { statusColors, tierLevels } from '../../../types/constants/customer';
import { CustomerState } from '../../../types/person/enums';

export const createCustomerColumns = (
  theme: Theme,
  handlers: {
    onInspect: (id: string | number) => void;
    onEdit: (id: string | number) => void;
    onDelete: (id: string | number, version: number) => void;
  },
): GridColDef[] => {
  return [
    {
      field: 'id',
      headerName: 'ID',
      // width: 330,
      minWidth: 150,
      flex: 1,
    },
    {
      field: 'username',
      headerName: 'Benutzername',
      width: 160,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 230,
    },
    {
      field: 'tierLevel',
      headerName: 'Rang',
      width: 180,
      renderCell: (params) => {
        const value = Number(params.value);
        const tier = tierLevels[value] || {
          label: 'Unbekannt',
          color: theme.palette.grey[400],
        };

        return (
          <Chip
            label={tier.label}
            variant="outlined"
            sx={{
              color: tier.color,
              borderColor: tier.color,
              fontWeight: 'bold',
              px: 2,
            }}
          />
        );
      },
    },
    {
      field: 'customerState',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const raw = params.value as CustomerState;
        const status = statusColors[raw] || {
          label: 'Unbekannt',
          color: 'default',
        };

        return (
          <Chip
            label={status.label}
            color={status.color}
            variant="outlined"
            sx={{ fontWeight: 'bold' }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Aktionen',
      width: 160,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Anzeigen">
            <IconButton
              onClick={() => handlers.onInspect(params.id)}
              sx={{ color: theme.palette.secondary.main }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bearbeiten">
            <IconButton
              onClick={() => handlers.onEdit(params.id)}
              sx={{ color: theme.palette.primary.main }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Löschen">
            <IconButton
              onClick={() => handlers.onDelete(params.id, params.row.version)}
              sx={{ color: theme.palette.error.main }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];
};
