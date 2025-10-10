import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { useInView } from "react-intersection-observer";
import { getTopTeams } from "../services/statsApi";
import { Link } from "react-router-dom";

const getColumns = (categoryKey) => {
  let pointsLabel = "Points";
  if (categoryKey === "totalRaids") pointsLabel = "Total Raids";
  else if (categoryKey === "totalDefense") pointsLabel = "Total Tackles";
  else if (categoryKey === "totalPoints") pointsLabel = "Total Points";
  else if (categoryKey === "superRaids") pointsLabel = "Super Raids";
  else if (categoryKey === "super10s") pointsLabel = "Super 10s";
  else if (categoryKey === "high5s") pointsLabel = "High 5s";
  else if (categoryKey === "avgRaids") pointsLabel = "Avg Raids";
  else if (categoryKey === "avgDefense") pointsLabel = "Avg Tackles";
  else if (categoryKey === "avgTotalPoints") pointsLabel = "Avg Total Points";

  return [
    { width: 10, label: "Logo", dataKey: "logo" },
    { width: 60, label: "Team", dataKey: "name" },
    { width: 60, label: pointsLabel, dataKey: categoryKey },
  ];
};

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

// Team Leaderboard Section
function TeamLeaderboardSection({ category, title }) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (!inView) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getTopTeams(category);
        setTeams(res.data || []);
      } catch (err) {
        console.error("Error fetching team leaderboard:", err);
        setError("Failed to load team data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [inView, category]);

  const columns = getColumns(category);

  return (
    <div
      className="leaderboard_section"
      ref={ref}
      style={{
        padding: "10px",
      }}
    >
      <h4
        style={{
          textAlign: "left",
          margin: "10px 0 0 10px",
          color: "white",
        }}
      >
        {title}
      </h4>
      <Paper
        style={{
          height: "40vh",
          width: "100%",
          margin: "20px auto",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.2)",
          boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
          color: "white",
        }}
      >
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : error ? (
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        ) : (
          <TableVirtuoso
            sx={{ background: "transparent" }}
            data={teams}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => (
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.dataKey}
                    variant="head"
                    align="center"
                    sx={{
                      color: "white",
                      border: "none",
                      background: "rgba(120, 120, 120, 1)",
                      fontWeight: 600,
                      padding: "8px",
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            )}
            itemContent={(index, row) => (
              <>
                {columns.map((col) => (
                  <TableCell
                    key={col.dataKey}
                    align="center"
                    sx={{
                      color: "white",
                      border: "none",
                      padding: "8px",
                    }}
                  >
                    {col.dataKey === "logo" ? (
                      <Link
                        to={`/team/${row._id}`}
                        style={{
                          textDecoration: "none",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={
                            row.logo ||
                            `${process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL}default-logo.png`
                          }
                          alt={row.name}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "1px solid rgba(255,255,255,0.3)",
                          }}
                        />
                      </Link>
                    ) : col.dataKey === "name" ? (
                      <Link
                        to={`/team/${row._id}`}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontWeight: 500,
                        }}
                      >
                        {row.name}
                      </Link>
                    ) : typeof row[col.dataKey] === "number" ? (
                      row[col.dataKey].toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })
                    ) : (
                      row[col.dataKey]
                    )}
                  </TableCell>
                ))}
              </>
            )}
          />
        )}
      </Paper>
    </div>
  );
}

export default function TeamsStats() {
  const categories = [
    { key: "totalPoints", title: "Team Total Points" },
    { key: "totalRaids", title: "Team Raid Points" },
    { key: "totalDefense", title: "Team Tackle Points" },
    { key: "super10s", title: "Team Super 10s" },
    { key: "high5s", title: "Team High 5s" },
    { key: "superRaids", title: "Team Super Raids" },
    { key: "avgTotalPoints", title: "Team Avg Total Points" },
    { key: "avgRaids", title: "Team Avg Raid Points" },
    { key: "avgDefense", title: "Team Avg Defense Points" },
  ];

  return (
    <div className="leader_board_container">
      {categories.map(({ key, title }) => (
        <TeamLeaderboardSection key={key} category={key} title={title} />
      ))}
    </div>
  );
}
