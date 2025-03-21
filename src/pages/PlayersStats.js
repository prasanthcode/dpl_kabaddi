import React, { useEffect, useState } from "react";
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
import { Link } from "react-router-dom";

// Function to determine column labels dynamically
const getColumns = (categoryKey) => {
  let pointsLabel = "Points"; // Default label

  if (categoryKey === "top5High5s") {
    pointsLabel = "High 5s";
  } else if (categoryKey === "top5Super10s") {
    pointsLabel = "Super 10s";
  } else if (categoryKey === "top10SuperRaids") {
    pointsLabel = "Super Raids";
  }

  return [
    { width: 50, label: "Profile", dataKey: "profilePic" },
    { width: 80, label: "Name", dataKey: "name" },
    { width: 30, label: pointsLabel, dataKey: "points" }, // Dynamic label
    { width: 100, label: "Team", dataKey: "team" },
  ];
};

// Virtuoso Table Components
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

// Function to sort players by points (descending order)
const sortPlayersByPoints = (players, key) => {
  return [...players].sort((a, b) => b[key] - a[key]);
};

// Main Component
export default function PlayersStats() {
  const [playersData, setPlayersData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/stats/top5`);
        setPlayersData(response.data);
      } catch (error) {
        console.error("Error fetching top players:", error);
        setError("Failed to load player data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { key: "top10RaidPoints", title: "Player Raid Points" },
    { key: "top10Tackles", title: "Player Tackle Points" },
    { key: "top10TotalPoints", title: "Player Total Points" },
    { key: "top5High5s", title: "Player High 5s" },
    { key: "top5Super10s", title: "Player Super 10s" },
    { key: "top10SuperRaids", title: "Player Super Raids" },
  ];

  return (
    <>
      <Navbar />
      {error ? (
        <div style={{ textAlign: "center", color: "red" }}>{error}</div>
      ) : (
        categories.map(({ key, title }) => {
          const sortedData = sortPlayersByPoints(playersData[key] || [], "points");
          const topScore = sortedData.length > 0 ? sortedData[0].points : 0; // Get highest score

          const columns = getColumns(key); // Get dynamic columns based on category

          return (
            <div key={key} style={{ marginBottom: "30px" }}>
              <h4 style={{ textAlign: "center" }}>{title}</h4>
              <Paper style={{ height: "50vh", width: "100%", margin: "20px auto" }}>
                {loading ? (
                  <p style={{ textAlign: "center" }}>Loading...</p>
                ) : (
                  <TableVirtuoso
                    data={sortedData}
                    components={VirtuosoTableComponents}
                    fixedHeaderContent={() => (
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.dataKey}
                            variant="head"
                            align="left"
                            style={{ width: column.width }}
                            sx={{ backgroundColor: "background.paper", fontWeight: "bold" }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                    itemContent={(index, row) => (
                      <>
                        {columns.map((column) => (
                          <TableCell key={column.dataKey} align="left">
                            {column.dataKey === "profilePic" ? (
                              <img
                                src={row[column.dataKey] || "https://via.placeholder.com/50"}
                                alt={row.name}
                                style={{ width: 40, height: 40, borderRadius: "50%" }}
                              />
                            ) : column.dataKey === "name" ? (
                              <>
                              <Link style={{textDecoration:"underline",color:"var(lightblue)"}} to={`/player/${row.playerId}`} >
    {row[column.dataKey]} 
  </Link>{row.points === topScore ? "🔥" : ""}
                                {/* {
                                  
                                row[column.dataKey]
                                } {row.points === topScore ? "🔥" : ""} */}
                              </>
                            ) : (
                              row[column.dataKey]
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
        })
      )}
      <Footer />
    </>
  );
}


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { TableVirtuoso } from "react-virtuoso";
// import Navbar from "../components/common/Navbar";
// import Footer from "../components/common/Footer";
// import TopPlayers from "../components/TopPlayers";

// const columnsDefense = [
//   { width: 50, label: "Profile", dataKey: "profilePic" },
//   { width: 100, label: "Name", dataKey: "name" },
//   { width: 20, label: "Points", dataKey: "totalDefensePoints" },
//   { width: 100, label: "Team", dataKey: "teamName" },
// ];
// const columnsRaid = [
//   { width: 50, label: "Profile", dataKey: "profilePic" },
//   { width: 100, label: "Name", dataKey: "name" },
//   { width: 20, label: "Points", dataKey: "totalRaidPoints" },
//   { width: 100, label: "Team", dataKey: "teamName" },
// ];

// const VirtuosoTableComponents = {
//   Scroller: React.forwardRef((props, ref) => (
//     <TableContainer component={Paper} {...props} ref={ref} />
//   )),
//   Table: (props) => (
//     <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />
//   ),
//   TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
//   TableRow,
//   TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
// };

// function fixedHeaderContent(columns) {
//   return (
//     <TableRow>
//       {columns.map((column) => (
//         <TableCell
//           key={column.dataKey}
//           variant="head"
//           align="left"
//           style={{ width: column.width }}
//           sx={{ backgroundColor: "background.paper", fontWeight: "bold" }}
//         >
//           {column.label}
//         </TableCell>
//       ))}
//     </TableRow>
//   );
// }

// function rowContent(index, row, topPoints, columns) {
//   return (
//     <>
//       {columns.map((column) => (
//         <TableCell key={column.dataKey} align="left">
//           {column.dataKey === "profilePic" ? (
//             <img
//               src={row[column.dataKey] || "https://via.placeholder.com/50"} 
//               alt={row.name}
//               style={{ width: 40, height: 40, borderRadius: "50%" }}
//             />
//           ) : column.dataKey === "name" ? (<>
//               {row[column.dataKey]} {row[columns[2].dataKey] === topPoints ? "🔥" : ""}
//           </>
//           ) : (
//             row[column.dataKey]
//           )}
//         </TableCell>
//       ))}
//     </>
//   );
// }

// export default function PlayersStats() {
//   const [playersData, setPlayersData] = useState({ topRaiders: [], topDefenders: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setError(null);
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/players/topplayers`);
//         setPlayersData(response.data);
//       } catch (error) {
//         console.error("Error fetching top players:", error);
//         setError("Failed to load player data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const topRaidPoints = Math.max(...playersData.topRaiders.map(p => p.totalRaidPoints), 0);
//   const topDefensePoints = Math.max(...playersData.topDefenders.map(p => p.totalDefensePoints), 0);

//   return (
//     <>
//       <Navbar />
//       <TopPlayers/>
//       {error ? (
//         <div style={{ textAlign: "center", color: "red" }}>{error}</div>
//       ) : (
//         <>
//           <h2 style={{ textAlign: "center" }}>Top Raiders</h2>
//           <Paper style={{ height: "60vh", width: "100%", margin: "20px auto" }}>
//             {loading ? (
//               <p style={{ textAlign: "center" }}>Loading...</p>
//             ) : (
//               <TableVirtuoso
//                 data={playersData.topRaiders}
//                 components={VirtuosoTableComponents}
//                 fixedHeaderContent={() => fixedHeaderContent(columnsRaid)}
//                 itemContent={(index, row) => rowContent(index, row, topRaidPoints, columnsRaid)}
//               />
//             )}
//           </Paper>

//           <h2 style={{ textAlign: "center" }}>Top Defenders</h2>
//           <Paper style={{ height: "60vh", width: "100%", margin: "20px auto" }}>
//             {loading ? (
//               <p style={{ textAlign: "center" }}>Loading...</p>
//             ) : (
//               <TableVirtuoso
//                 data={playersData.topDefenders}
//                 components={VirtuosoTableComponents}
//                 fixedHeaderContent={() => fixedHeaderContent(columnsDefense)}
//                 itemContent={(index, row) => rowContent(index, row, topDefensePoints, columnsDefense)}
//               />
//             )}
//           </Paper>
//         </>
//       )}
//       <Footer />
//     </>
//   );
// }