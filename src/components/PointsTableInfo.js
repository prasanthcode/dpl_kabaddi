import { Card, CardContent } from "@mui/material";

const PointsTableInfo = () => {
    const columns = [
        { label: "Po", description: "Team's ranking position" },
        { label: "P", description: "Matches played so far" },
        { label: "W", description: "Matches won by team" },
        { label: "L", description: "Matches lost by team" },
        { label: "T", description: "Matches ended in draw" },
        { label: "Pts", description: "Total points from wins" },
        { label: "Pd", description: "Points scored minus conceded" },
      ];
  return (
    <Card sx={{ maxWidth: 600, margin: "0px auto", padding: "10px" ,backgroundColor:"var(--primary-color)",color:"var(--text-inverted)"}}>
      <CardContent>
        <h3>Points Table Column Descriptions</h3>
        <ul>
          {columns.map((col, index) => (
            <li key={index}>
              <strong>{col.label}:</strong> {col.description}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PointsTableInfo;
