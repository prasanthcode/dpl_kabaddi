import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PointsTableContext = createContext();

export const PointsTableProvider = ({ children }) => {
  const [pointsTable, setPointsTable] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://dpl-kabaddi-backend.vercel.app/api/matches/pointstable`);
        setPointsTable(response.data);
      } catch (error) {
        console.error("Error fetching points:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPoints();
  }, []);

  return (
    <PointsTableContext.Provider value={{ pointsTable, loading }}>
      {children}
    </PointsTableContext.Provider>
  );
};
