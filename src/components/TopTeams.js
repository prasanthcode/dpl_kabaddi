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
        marginBottom: "30px",
        border: "1px solid #5c5c5c",
        borderRadius: "20px",
      }}
    >
      <h4
        style={{
          textAlign: "left",
          margin: "10px 0 0 10px",
          color: "var(--text-light)",
        }}
      >
        {title}
      </h4>
      <Paper
        style={{
          height: "40vh",
          width: "100%",
          margin: "20px auto",
          backgroundColor: "var(--primary-dark)",
          color: "var(--text-light)",
        }}
      >
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : error ? (
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        ) : (
          <TableVirtuoso
            sx={{ backgroundColor: "var(--primary-dark)" }}
            data={teams}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => (
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.dataKey}
                    variant="head"
                    align="center"
                    style={{ width: col.width }}
                    sx={{
                      color: "var(--text-light)",
                      border: "none",
                      backgroundColor: "var(--primary-dark)",
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
                      color: "var(--text-light)",
                      borderColor: "#373f4e",
                      backgroundColor: "var(--primary-dark)",
                      verticalAlign: "middle",
                    }}
                  >
                    {col.dataKey === "logo" ? (
                      <Link
                        to={`/team/${row._id}`}
                        style={{
                          textDecoration: "none",
                          display: "inline-block",
                          color: "inherit",
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
                            verticalAlign: "middle",
                          }}
                        />
                      </Link>
                    ) : col.dataKey === "name" ? (
                      <Link
                        to={`/team/${row._id}`}
                        style={{
                          textDecoration: "none",
                          color: "var(--text-light)",
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
