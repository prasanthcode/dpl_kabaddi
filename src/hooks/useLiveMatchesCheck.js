import { useEffect, useState } from "react";
import { getLiveMatches } from "../services/matchesApi";

export default function useLiveMatchesCheck() {
  const [showLive, setShowLive] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkLiveMatches = async () => {
      try {
        const response = await getLiveMatches();
        if (Array.isArray(response.data) && response.data.length === 0) {
          setShowLive(false);
        }
      } catch (error) {
        console.error("Error fetching live matches:", error);
        setShowLive(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkLiveMatches();
  }, []);

  return { showLive, isChecking };
}
