import { useEffect, useState } from "react";
import { getLiveMatches } from "../services/matchesApi";

export default function useLiveMatchesCheck() {
  const [showLive, setShowLive] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkLiveMatches = async () => {
      try {
        const response = await getLiveMatches();
        if (isMounted) {
          const hasLive =
            Array.isArray(response.data) && response.data.length > 0;
          setShowLive(hasLive);
        }
      } catch (error) {
        console.error("Error fetching live matches:", error);
        if (isMounted) setShowLive(false);
      } finally {
        if (isMounted) setIsChecking(false);
      }
    };

    checkLiveMatches();
    return () => {
      isMounted = false;
    };
  }, []);

  return { showLive, isChecking };
}
