import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import MatchList from "../components/MatchList";
import MatchListSkeleton from "../components/MatchListSkeleton";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function Matches({ isAdmin, url = "live", limit=null }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const path = location.pathname;
  const isHomePage = path === "/";

  // Fetch matches based on the provided URL
  const fetchMatches = async () => {
    if (!url) return;
  
    try {
      if(url!=="live"){

        setLoading(true);
      }
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/matches/${url}?limit=${limit}`);
      const newMatches = Array.isArray(response.data) ? response.data : []; // Ensure it's an array
  
      // setMatches((prevMatches) => {
      //   if (prevMatches.length === 0) {
      //     return newMatches;
      //   }
  
      //   return newMatches.map((newMatch) => {
      //     const existingMatch = prevMatches.find((m) => m._id === newMatch._id);
      //     return existingMatch ? { ...existingMatch, ...newMatch } : newMatch;
      //   });
      // });
      setMatches(newMatches);
  
      setLoading(false);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setMatches([]); // Set empty array on error to prevent crashes
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMatches(); // Initial fetch

    let interval;
    if (url === "live") {
      interval = setInterval(fetchMatches, 5000); // Fetch every 5 seconds for live matches
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [path]);

  return (
    <div>
      {!isHomePage && !isAdmin && <Navbar />}

      {!isAdmin && !isHomePage && (
        <div className="buttons">
          {["live", "upcoming", "completed"].map((type) => (
            <Link
              key={type}
              to={`/${type}`}
              style={{
                backgroundColor: path === `/${type}` ? "orange" : "",
                color: path === `/${type}` ? "black" : "",
                padding: "10px 20px",
                minWidth:"20%",
                textAlign:"center",
                borderRadius:"5px",
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Link>
          ))}
        </div>
      )}

{loading ? (
    <MatchListSkeleton isHomePage={isHomePage} />
) : matches.length === 0  ? (
    <p style={{ textAlign: "center", padding: "20px", fontSize: "18px", color: "gray" ,minHeight:"100vh" }}>
        No {`${url}`} Matches
    </p>
) : (
    <MatchList matches={matches} status={url} isAdmin={isAdmin} isHomePage={isHomePage}/>
)}
      {!isHomePage &&  <Footer />}

    </div>
  );
}
