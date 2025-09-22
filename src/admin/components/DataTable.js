import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DataTable({
  columns = [],
  rows = [],
  onEdit,
  onDelete,
}) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
      <Table size="small" aria-label="data table">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field}>{col.headerName}</TableCell>
            ))}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                No data
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row._id || row.id}>
                {columns.map((col) => (
                  <TableCell key={col.field}>
                    {col.render ? col.render(row) : row[col.field]}
                  </TableCell>
                ))}
                <TableCell align="right">
                  <IconButton
                    size="small"
                    onClick={() => onEdit && onEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete && onDelete(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
