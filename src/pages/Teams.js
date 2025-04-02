import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/common/Navbar";
import TeamSkeleton from "../components/TeamSkeleton";
import { useTeams } from "../context/TeamContext"; // Import context hook
import Footer from "../components/common/Footer";

export default function Teams() {
  const { teams, loading } = useTeams(); // Use context instead of state

  return (
    <div>
      <Navbar />
      <div className="match_container teams">
        <div className="d_match">
          {loading
            ? Array.from({ length: 6 }).map((_, index) => <TeamSkeleton key={index} />) // Show 6 skeletons
            : teams.map((team, index) => (
                <Link to={`/team/${team._id}`} style={{ textDecoration: "none", color: "white" }} key={team._id}>
                  <div className="single_match">
                    <div className="img_wrap">
                      {/* Animate Image */}
                      <motion.img
                        src={team.logo}
                        alt=""
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
                      />
                      {/* Animate Team Name */}
                      <motion.div
                        className="team_1"
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.15 }}
                      >
                        <h3>{team.name}</h3>
                      </motion.div>
                      {/* Animate Icon */}
                      <motion.h2
                        initial={{ x: -30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.2 }}
                      >
                        <FontAwesomeIcon icon={faArrowRight} size="lg" />
                      </motion.h2>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
