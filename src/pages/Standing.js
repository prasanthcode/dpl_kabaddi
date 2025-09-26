import { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PointsTableInfo from "../components/PointsTableInfo";
import { PointsTableContext } from "../context/PointsTableContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Playoff from "../components/Playoff";

export default function Standing() {
  const { pointsTable, loading } = useContext(PointsTableContext);

  return (
    <>
      <h4 style={{ textAlign: "center", margin: "20px 0", fontSize: "18px" }}>
        DPL Boys Kabaddi League Points Table
      </h4>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: "0 auto" }}>
          <Table
            sx={{
              minWidth: 400,
              "& .MuiTableCell-root": {
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                padding: { xs: "10px 5px", sm: "20px 10px", md: "25px 15px" },
                textAlign: "left",
                fontWeight: 500,
              },
            }}
            aria-label="points table"
          >
            <TableHead
              sx={{
                "& .MuiTableCell-head": {
                  padding: { xs: "4px 4px", sm: "6px 8px", md: "8px 12px" },
                  fontWeight: 600,
                  fontSize: { xs: "12px", sm: "14px", md: "16px" },
                  backgroundColor: "rgb(197, 197, 197)",
                },
              }}
            >
              <TableRow>
                <TableCell sx={{ width: { xs: "10px", md: "10px" } }}>Po</TableCell>
                <TableCell align="right"sx={{ width: { xs: "10px", md: "10px" } }}></TableCell>
                <TableCell align="right" sx={{ width: { xs: "40px", md: "80px" } }}>
                  Team
                </TableCell>
                <TableCell align="right">P</TableCell>
                <TableCell align="right">W</TableCell>
                <TableCell align="right">L</TableCell>
                <TableCell align="right">T</TableCell>
                <TableCell align="right">Pts</TableCell>
                <TableCell align="right">Pd</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& td, & th, & a": { color: "black" },
                "& tr": { transition: "background 0.3s ease" },
              }}
            >
              {pointsTable.map((row, index) => (
                <TableRow
                  key={row.teamId}
                  sx={{
                    backgroundColor: row.qualifier === false ? "rgb(255, 210, 210)" : "",
                    "&:hover": { backgroundColor: "rgba(255, 235, 59, 0.2)" },
                  }}
                >
                  <TableCell>{row.qualifier === true ? `Q${index + 1}` : index + 1}</TableCell>
                  <TableCell align="right">
                    <img src={row.logo} alt="" style={{width:"30px",borderRadius:"50%"}}/></TableCell>
                  
                  <TableCell align="right">
                    <Link
                      to={`/team/${row.teamId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {row.teamName}
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "orange",
                          marginLeft: "5px",
                        }}
                      >
                        {row.finalWinner === true ? "🏆 Winner" : ""}
                      </span>
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
      )}
      <Playoff />
      <PointsTableInfo />
    </>
  );
}
