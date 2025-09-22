import { db } from "../config/firebase";
import { ref, onValue, off } from "firebase/database";

const normalizeMatch = (id, raw) => {
  const stats = raw.stats || {};
  return {
    matchId: id,
    status: raw.status || stats.status || "Unknown",
    halfTime: raw.halfTime ?? stats.halfTime ?? false,
    matchNumber: raw.matchNumber ?? stats.matchNumber,
    matchType: raw.matchType ?? stats.matchType,
    teamA: raw.teamA || stats.teamA,
    teamB: raw.teamB || stats.teamB,
    lastAction: raw.lastAction || stats.lastAction,
    ...raw,
    ...stats, 
  };
};

export const listenToMatch = (matchId, callback) => {
  const matchRef = ref(db, `matches/${matchId}`);

  onValue(matchRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(normalizeMatch(matchId, snapshot.val()));
    }
  });

  return () => off(matchRef, "value");
};

export const listenToLiveMatches = (callback) => {
  const matchesRef = ref(db, "matches");

  onValue(matchesRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      const liveMatches = Object.entries(data)
        .map(([id, raw]) => normalizeMatch(id, raw))
        .filter((m) => m.status === "Ongoing" || m.status === "LIVE");

      callback(liveMatches);
    } else {
      callback([]);
    }
  });

  return () => off(matchesRef, "value");
};
