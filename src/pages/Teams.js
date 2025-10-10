import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTeams } from "../context/TeamContext";
import "../styles/Teams.css";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Teams() {
  const { teams, loading } = useTeams();

  return (
    <div className="teams-container">
      {loading
        ? <LoadingSpinner/>
        : teams.map((team, index) => (
            <Link
              to={`/team/${team._id}`}
              style={{ textDecoration: "none", color: "white" }}
              key={team._id}
            >
              <div className="teams-card">
                <div className="teams-img-wrap">
                  <motion.img
                    src={team.logo}
                    alt={team.name}
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.1,
                    }}
                  />
                  <motion.div
                    className="teams-name"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.15,
                    }}
                  >
                    <h3>{team.name}</h3>
                  </motion.div>
                  <motion.div
                    className="teams-arrow"
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: index * 0.2,
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowRight} size="lg" />
                  </motion.div>
                </div>
              </div>
            </Link>
          ))}
    </div>
  );
}
