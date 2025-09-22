import { useEffect } from "react";
import {
  getDatabase,
  ref,
  onDisconnect,
  push,
  set,
  remove,
} from "firebase/database";

export function useLiveMatchConnection(isLiveMatch) {
  useEffect(() => {
    if (!isLiveMatch) return;

    const db = getDatabase();

    const connectionRef = push(ref(db, "connections"));

    set(connectionRef, true);

    onDisconnect(connectionRef).remove();

    return () => {
      remove(connectionRef);
    };
  }, [isLiveMatch]);
}
