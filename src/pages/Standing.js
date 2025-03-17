import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Navbar from "../components/common/Navbar";
import PointsTableInfo from "../components/PointsTableInfo";
import { PointsTableContext } from "../context/PointsTableContext";
import { Link } from "react-router-dom";

export default function Standing() {
  const { pointsTable, loading } = useContext(PointsTableContext);

  if (loading) return "Loading...";
  if (!pointsTable.length) return "No data available.";

  return (
    <>
      <Navbar />
      <h4>Department Premier League Points Table</h4>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 400,
            "& .MuiTableCell-root": {
              fontSize: "14px",
              padding: "30px 10px",
              textAlign: "left",
              fontWeight: "500",
            },
          }}
          aria-label="points table"
        >
          <TableHead
            sx={{
              "& .MuiTableCell-head": {
                padding: "4px 8px",
                fontWeight: "600",
                fontSize: "14px",
                backgroundColor: "rgb(197, 197, 197)",
              },
            }}
          >
            <TableRow>
              <TableCell>Po</TableCell>
              <TableCell align="right">Team</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">T</TableCell>
              <TableCell align="right">Pts</TableCell>
              <TableCell align="right">Pd</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{backgroundColor:"var(--primary-color)","& td, & th ,& a": { color: "white" },}}>
            {pointsTable.map((row, index) => (
              <TableRow key={row.teamId}>
                <TableCell>{row.wins >= 3 ? "Q" : index + 1}</TableCell>
                <TableCell align="right">
                  <Link to={`/team/${row.teamId}`}>
                  
                  {row.teamName}
                  </Link>

                </TableCell>
                <TableCell align="right">{row.matchesPlayed}</TableCell>
                <TableCell align="right">{row.wins}</TableCell>
                <TableCell align="right">{row.losses}</TableCell>
                <TableCell align="right">{row.ties}</TableCell>
                <TableCell align="right">{row.points}</TableCell>
                <TableCell align="right">{row.pointsDifference}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PointsTableInfo />
    </>
  );
}
