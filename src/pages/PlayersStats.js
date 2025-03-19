import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const columns = [
  { width: 50, label: "Profile", dataKey: "profilePic" }, // Profile Picture Column
  { width: 100, label: "Name", dataKey: "name" },
  { width: 40, label: "Points", dataKey: "points" },
  { width: 100, label: "Team", dataKey: "teamName" },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent(title) {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row, isTop) {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {column.dataKey === "profilePic" ? (
            <img
              src={row[column.dataKey] || "https://via.placeholder.com/50"} // Fallback for missing images
              alt={row.name}
              style={{ width: 40, height: 40, borderRadius: "50%" }}
            />
          ) : column.dataKey === "name" ? (
            <>{row[column.dataKey]} {isTop ? "🔥" : ""}</>
          ) : (
            row[column.dataKey]
          )}
        </TableCell>
      ))}
    </>
  );
}

export default function PlayersStats() {
  const [raiders, setRaiders] = useState([]);
  const [defenders, setDefenders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [raidersRes, defendersRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/api/players/topraiders`),
          axios.get(`${process.env.REACT_APP_API_URL}/api/players/topdefenders`),
        ]);

        const topRaidPoints = Math.max(...raidersRes.data.map(player => player.totalRaidPoints), 0);
        const topDefensePoints = Math.max(...defendersRes.data.map(player => player.totalDefensePoints), 0);

        setRaiders(
          raidersRes.data.map(player => ({
            ...player,
            points: player.totalRaidPoints,
            isTop: player.totalRaidPoints === topRaidPoints,
          }))
        );

        setDefenders(
          defendersRes.data.map(player => ({
            ...player,
            points: player.totalDefensePoints,
            isTop: player.totalDefensePoints === topDefensePoints,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      {/* Top Raiders */}
      <h2>Top Raiders</h2>
      <Paper style={{ height: "60vh", width: "100%", marginBottom: "20px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableVirtuoso
            data={raiders}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => fixedHeaderContent("Top Raiders")}
            itemContent={(index, row) => rowContent(index, row, row.isTop)}
          />
        )}
      </Paper>

      {/* Top Defenders */}
      <h2>Top Defenders</h2>
      <Paper style={{ height: "60vh", width: "100%" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableVirtuoso
            data={defenders}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => fixedHeaderContent("Top Defenders")}
            itemContent={(index, row) => rowContent(index, row, row.isTop)}
          />
        )}
      </Paper>

      <Footer />
    </>
  );
}