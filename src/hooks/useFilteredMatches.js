import { useEffect, useState } from "react";
import { getMatches } from "../services/matchesApi";
import { listenToLiveMatches } from "../services/firebaseService";

export function useFilteredMatches(url, limit) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = null;

    const fetchData = async () => {
      try {
        const response = await getMatches(url, limit);
        const initial = Array.isArray(response.data) ? response.data : [];
        setMatches(initial);

        if (url === "live") {
          unsubscribe = listenToLiveMatches((liveData) => {
            setMatches(liveData);
          });
        }
      } catch (err) {
        setMatches([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [url, limit]);

  return { matches, loading };
}
