import { createContext, useEffect, useState } from "react";
import { getPointsTable } from "../services/matchesApi";

export const PointsTableContext = createContext();

export const PointsTableProvider = ({ children }) => {
  const [pointsTable, setPointsTable] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPoints = async () => {
      setLoading(true);
      try {
        const response = await getPointsTable();
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
