import { useEffect, useState } from "react";
import { getMatches } from "../services/matchesApi";
import { listenToLiveMatches } from "../services/firebaseService";

export function useFilteredMatches(url, limit) {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setMatches(null);

      try {
        const response = await getMatches(url, limit);
        const initial = Array.isArray(response.data) ? response.data : [];

        if (isMounted) {
          setMatches(initial);
        }

        if (url === "live" && isMounted) {
          unsubscribe = listenToLiveMatches((liveData) => {
            setMatches(liveData);
          });
        }
      } catch (err) {
        console.error("Error fetching matches:", err);
        if (isMounted) setMatches([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [url, limit]);

  return { matches, loading };
}
