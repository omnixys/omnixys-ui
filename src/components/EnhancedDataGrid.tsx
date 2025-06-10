import {
  DataGrid,
  GridColDef,
  GridToolbar,
  DataGridProps,
} from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { useState } from "react";

interface EnhancedDataGridProps<T> extends Partial<DataGridProps> {
  rows: T[];
  columns: GridColDef[];
}

const EnhancedDataGrid = <T,>({
  rows,
  columns,
  ...props
}: EnhancedDataGridProps<T>) => {
  const theme = useTheme();
    const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
    });
  
  return (
    <Box
      sx={{
        borderRadius: 1,
        overflow: "hidden",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[10, 25, 50]}
        slots={{ toolbar: GridToolbar }}
        sx={{
          transition: "background-color 0.2s ease",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.secondary.main,
            // color: theme.palette.getContrastText(theme.palette.secondary.main),
            fontWeight: "bold",
          },

          "& .MuiDataGrid-row:nth-of-type(odd)": {
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.background.default
                : theme.palette.background.paper,
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor:
              theme.palette.mode === "light"
                ? "#F0ECFF"
                : theme.palette.action.hover,
          },

          "& .MuiDataGrid-cell": {
            transition: "all 0.15s ease",
          },

          "& .MuiDataGrid-columnHeader:focus": {
            outline: `2px solid ${theme.palette.primary.main}`,
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default EnhancedDataGrid;
