import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Navbar from '../components/common/Navbar';

const columns = [
  { width: 150, label: 'Name', dataKey: 'name' },
  { width: 150, label: 'Team', dataKey: 'teamName' },
  { width: 100, label: 'Points', dataKey: 'points' }, // Shared field for raid & defense points
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
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
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(index, row) {
  return (
    <>
      {columns.map((column) => (
        <TableCell key={column.dataKey} align="left">
          {row[column.dataKey]}
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
          axios.get(`${process.env.REACT_APP_API_URL}/api/players/topraiders`), // Endpoint for top raiders
          axios.get(`${process.env.REACT_APP_API_URL}/api/players/topdefenders`), // Endpoint for top defenders
        ]);

        setRaiders(raidersRes.data.map(player => ({ ...player, points: player.totalRaidPoints }))); // Map field
        setDefenders(defendersRes.data.map(player => ({ ...player, points: player.totalDefensePoints }))); // Map field
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
      <Paper style={{ height: "60vh", width: '100%', marginBottom: "20px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableVirtuoso
            data={raiders}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => fixedHeaderContent("Top Raiders")}
            itemContent={rowContent}
          />
        )}
      </Paper>

      {/* Top Defenders */}
      <h2>Top Defenders</h2>
      <Paper style={{ height: "60vh", width: '100%' }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TableVirtuoso
            data={defenders}
            components={VirtuosoTableComponents}
            fixedHeaderContent={() => fixedHeaderContent("Top Defenders")}
            itemContent={rowContent}
          />
        )}
      </Paper>
    </>
  );
}
