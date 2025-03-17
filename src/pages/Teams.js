import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import TeamSkeleton from "../components/TeamSkeleton";
import { useTeams } from "../context/TeamContext"; // Import context hook

export default function Teams() {
  const { teams, loading } = useTeams(); // Use context instead of state
  console.log(teams);
  return (
    <div>
      <Navbar />
      <div className="match_container teams">
        <div className="d_match">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <TeamSkeleton key={index} />) // Show 6 skeletons
            : teams.map((team) => (
                <Link
                  to={`/team/${team._id}`}
                  style={{ textDecoration: "none", color: "white" }}
                  key={team._id}
                >
                  <div className="single_match">
                    <div className="img_wrap">
                      <img src={team.logo} alt="" />
                      <div className="team_1">
                        <h3>{team.name}</h3>
                      </div>
                      <h2>
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
