import { useEffect, useState } from "react";
import { getLiveConnectionsCount } from "../services/matchesApi";
export function useLiveConnections() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCount = async () => {
    try {
      setLoading(true);
      const { data } = await getLiveConnectionsCount();
      setCount(data?.activeConnections || 0);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch live connections:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return { count, loading, error, refetch: fetchCount };
}
