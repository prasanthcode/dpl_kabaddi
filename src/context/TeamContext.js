import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
   
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/teams");
        setTeams(response.data);
        
      } catch (error) {
        console.error("Error fetching Teams:", error);
      } finally {
        setLoading(false);
      }
    };

    if (teams.length === 0) fetchTeams(); // Fetch only if teams are not loaded
  }, [teams]);

  return (
    <TeamContext.Provider value={{ teams, loading }}>
      {children}
    </TeamContext.Provider>
  );
};

// Custom hook for using TeamContext
export const useTeams = () => useContext(TeamContext);
