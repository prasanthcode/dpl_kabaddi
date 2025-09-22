import { useEffect, useState } from "react";
import axios from "axios";

export default function useLiveMatchesCheck() {
  const [showLive, setShowLive] = useState(true);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkLiveMatches = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/matches/live`
        );
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
