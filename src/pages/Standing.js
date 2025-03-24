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
import Footer from "../components/common/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import Playoff from "../components/Playoff";

export default function Standing() {
  const { pointsTable, loading } = useContext(PointsTableContext);


  return (
    <>
      <Navbar />
      <h4 style={{textAlign:"center"}}>DPL Boys Kabaddi Points Table</h4>
      {loading ?<LoadingSpinner/>:<TableContainer component={Paper}>
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
              <TableCell align="right" sx={{width:"50px"}}>Team</TableCell>
              <TableCell align="right">P</TableCell>
              <TableCell align="right">W</TableCell>
              <TableCell align="right">L</TableCell>
              <TableCell align="right">T</TableCell>
              <TableCell align="right">Pts</TableCell>
              <TableCell align="right">Pd</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{"& td, & th ,& a": { color: "black" }}}>
            {pointsTable.map((row, index) => (
              <TableRow key={row.teamId} sx={{backgroundColor:index===4?"rgb(255, 210, 210)":""}}>
                <TableCell>{index + 1}</TableCell>
                <TableCell align="right">
                  <Link to={`/team/${row.teamId}`} style={{textDecoration:"none"}}>
                  
                  {row.teamName}{index < 4 ? "(Q)" :""}
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
      </TableContainer>}
                  <Playoff/>
      
      <PointsTableInfo />
            <Footer/>
      
    </>
  );
}
