import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { getPlayerStats } from "../services/statsApi";
import { color } from "framer-motion";

const getColumns = (categoryKey) => {
  let pointsLabel = "Points";
  if (categoryKey === "top5High5s") pointsLabel = "High 5s";
  else if (categoryKey === "top5Super10s") pointsLabel = "Super 10s";
  else if (categoryKey === "top10SuperRaids") pointsLabel = "Super Raids";

  return [
    // { width: 20, label: "", dataKey: "rank" },
    { width: 50, label: "Profile", dataKey: "profilePic" },
    { width: 80, label: "Name", dataKey: "name" },
    { width: 30, label: pointsLabel, dataKey: "points" },
    { width: 100, label: "Team", dataKey: "team" },
  ];
};

// Virtuoso Table Components
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

// Function to sort players by points
const sortPlayersByPoints = (players, key) => {
  return [...players].sort((a, b) => b[key] - a[key]);
};

// One Section (lazy fetch only when visible)
function LeaderboardSection({ category, title }) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (!inView) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await getPlayerStats(category);
        setPlayers(res.data[category] || []);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load player data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [inView, category]);

  const sortedData = sortPlayersByPoints(players, "points");
  const topScore = sortedData.length > 0 ? sortedData[0].points : 0;
  const columns = getColumns(category);

  return (
    <div
      className="leaderboard_section"
      ref={ref}
      style={{
        marginBottom: "30px",
        // border: "1px solid #212121ff",
        borderRadius: "10px",
        backgroundColor: "#c9c9c9",
      }}
    >
      <h4
        style={{
          textAlign: "left",
          margin: "10px 0 0 10px",
          color: "black",
        }}
      >
        {title}
      </h4>
      <Paper
        style={{
          height: "50vh",
          width: "100%",
          margin: "20px auto",
          backgroundColor: "#c9c9c9",
          color: "black",
        }}
      >
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : error ? (
          <div style={{ textAlign: "center", color: "red" }}>{error}</div>
        ) : (
          <TableVirtuoso
            sx={{ backgroundColor: "#c9c9c9" }}
            data={sortedData}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => (
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.dataKey}
                    variant="head"
                    align="left"
                    style={{ width: col.width }}
                    sx={{
                      color: "black",
                      border: "none",
                      backgroundColor: "#c9c9c9",
                      padding: "0",
                      textAlign: "center",
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
                      color: "black",
                      borderColor: "#373f4e",
                    }}
                  >
                    {col.dataKey === "profilePic" ? (
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        to={`/player/${row.playerId}`}
                      >
                        <img
                          src={
                            row[col.dataKey] ||
                            `${process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL}g2xafebqt6zkwwuzdaiy.png`
                          }
                          alt={row.name}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                          }}
                        />
                      </Link>
                    ) : col.dataKey === "name" ? (
                      <>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "black",
                          }}
                          to={`/player/${row.playerId}`}
                        >
                          {row[col.dataKey]}
                        </Link>
                        {row.points === topScore ? "🔥" : ""}
                      </>
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

export default function PlayersStats() {
  const categories = [
    { key: "top10RaidPoints", title: "Player Raid Points" },
    { key: "top10Tackles", title: "Player Tackle Points" },
    { key: "top5Super10s", title: "Player Super 10s" },
    { key: "top5High5s", title: "Player High 5s" },
    { key: "top10SuperRaids", title: "Player Super Raids" },
    { key: "top10TotalPoints", title: "Player Total Points" },
  ];

  return (
    <>
      <div className="leader_board_container">
        {categories.map(({ key, title }) => (
          <LeaderboardSection key={key} category={key} title={title} />
        ))}
      </div>
    </>
  );
}
