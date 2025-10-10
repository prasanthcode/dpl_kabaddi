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
      <h4
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "clamp(18px, 3vw, 24px)",
          color: "white",
        }}
      >
        DPL Boys Kabaddi League Points Table
      </h4>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: "95%",
            margin: "0 auto",
            overflowX: "auto",
            padding: { xs: "8px", sm: "12px", md: "16px" },
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
          }}
        >
          <Table
            sx={{
              minWidth: 500,
              "& .MuiTableCell-root": {
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
                padding: { xs: "10px 8px", sm: "16px 12px", md: "20px 15px" },
                textAlign: "center",
                fontWeight: 500,
                color: "white",
              },
            }}
            aria-label="points table"
          >
            <TableHead
              sx={{
                "& .MuiTableCell-head": {
                  padding: { xs: "6px 4px", sm: "8px 6px", md: "10px 8px" },
                  fontWeight: 600,
                  fontSize: { xs: "13px", sm: "14px", md: "16px" },
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
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
                <TableCell>Pts</TableCell>
                <TableCell>Form</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& td, & th, & a": { color: "white" },
                "& tr": { transition: "all 0.3s ease" },
              }}
            >
              {pointsTable.map((row, index) => (
                <TableRow
                  key={row.teamId}
                  sx={{
                    backgroundColor:
                      row.qualifier === false
                        ? "rgba(255,0,0,0.2)"
                        : "rgba(255,255,255,0.05)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    },
                    borderRadius: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <TableCell>
                    {row.qualifier === true ? `Q${index + 1}` : index + 1}
                  </TableCell>
                  <TableCell>
                    <img
                      src={row.logo}
                      alt=""
                      style={{
                        width: "clamp(25px, 5vw, 35px)",
                        borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.3)",
                      }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "left !important",
                      minWidth: { xs: "100px", sm: "130px", md: "150px" },
                    }}
                  >
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
                          <br /> 🏆 Winner
                        </span>
                      )}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.matchesPlayed}</TableCell>
                  <TableCell align="right">{row.wins}</TableCell>
                  <TableCell align="right">{row.losses}</TableCell>
                  <TableCell align="right">{row.ties}</TableCell>
                  <TableCell align="right">{row.pointsDifference}</TableCell>
                  <TableCell align="right">{row.points}</TableCell>
                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        padding: "6px",
                        gap: "6px",
                        overflowX: "auto",
                        maxWidth: "120px",
                        margin: "0 auto",
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
                                minWidth: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                backgroundColor: bgColor,
                                color: "white",
                                fontSize: "12px",
                                fontWeight: "bold",
                                flexShrink: 0,
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
