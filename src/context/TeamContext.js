import { createContext, useContext } from "react";
import { useTeams as useTeamsHook } from "../hooks/useTeams";

const TeamContext = createContext();

export const TeamProvider = ({ children }) => {
  const { teams, loading, setTeams } = useTeamsHook();

  return (
    <TeamContext.Provider value={{ teams, loading, setTeams }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => useContext(TeamContext);
