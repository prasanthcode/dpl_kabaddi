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
        <TableContainer
          component={Paper}
          sx={{ maxWidth: 1200, margin: "0 auto" }}
        >
          <Table
            sx={{
              minWidth: 400,
              "& .MuiTableCell-root": {
                fontSize: { xs: "12px", sm: "14px", md: "16px" },
                padding: { xs: "10px 5px", sm: "20px 10px", md: "25px 15px" },
                textAlign: "center",
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
                <TableCell>Po</TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ textAlign: "left !important" }}>
                  Team
                </TableCell>
                <TableCell>P</TableCell>
                <TableCell>W</TableCell>
                <TableCell>L</TableCell>
                <TableCell>T</TableCell>
                <TableCell>Pd</TableCell>
                <TableCell>Form</TableCell> {/* New column */}
                <TableCell>Pts</TableCell>
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
                    backgroundColor:
                      row.qualifier === false ? "rgb(255, 210, 210)" : "",
                    "&:hover": { backgroundColor: "rgba(255, 235, 59, 0.2)" },
                  }}
                >
                  <TableCell>
                    {row.qualifier === true ? `Q${index + 1}` : index + 1}
                  </TableCell>
                  <TableCell>
                    <img
                      src={row.logo}
                      alt=""
                      style={{ width: "30px", borderRadius: "50%" }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "left !important" }}>
                    <Link
                      to={`/team/${row.teamId}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {row.teamName}
                      {row.finalWinner && (
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "orange",
                            marginLeft: "5px",
                          }}
                        >
                          🏆 Winner
                        </span>
                      )}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.matchesPlayed}</TableCell>
                  <TableCell align="right">{row.wins}</TableCell>
                  <TableCell align="right">{row.losses}</TableCell>
                  <TableCell align="right">{row.ties}</TableCell>
                  <TableCell align="right">{row.pointsDifference}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "4px",
                      }}
                    >
                      {row.lastThreeMatches &&
                      row.lastThreeMatches.length > 0 ? (
                        row.lastThreeMatches.map((result, idx) => {
                          let bgColor;
                          if (result === "W") bgColor = "green";
                          else if (result === "L") bgColor = "red";
                          else if (result === "T") bgColor = "gray";

                          return (
                            <span
                              key={idx}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                backgroundColor: bgColor,
                                color: "white",
                                fontSize: "12px",
                                fontWeight: "bold",
                              }}
                            >
                              {result}
                            </span>
                          );
                        })
                      ) : (
                        <span>-</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right">{row.points}</TableCell>
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
