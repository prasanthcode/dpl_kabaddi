import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import profilePic from "../assets/pngegg (30).png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { usePlayers } from "../hooks/usePlayers";
import "../styles/TeamInfo.css";
import TeamStats from "../components/TeamStats";

export default function TeamInfo() {
  const { id } = useParams();
  const { players, loading } = usePlayers(id);

  return (
    <div className="teaminfo-container">
      <TeamStats teamId={id} />

      {loading ? (
        <></>
      ) : (
        <>
          {players.length > 0 ? (
            <div className="teaminfo-list">
              <h2 className="teaminfo-title">Squad</h2>
              <div className="teaminfo-items">
                {players.map((player, index) => (
                  <Link
                    to={`/player/${player._id}`}
                    style={{ textDecoration: "none", color: "white" }}
                    key={player._id}
                  >
                    <div className="teaminfo-card">
                      <div className="teaminfo-img-wrap">
                        {/* Animate Image */}
                        <motion.img
                          src={
                            player.profilePic === ""
                              ? profilePic
                              : player.profilePic
                          }
                          alt={player.name}
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: index * 0.1,
                          }}
                        />

                        {/* Merged Player Name + Arrow */}
                        <motion.div
                          className="teaminfo-details"
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{
                            duration: 0.5,
                            ease: "easeOut",
                            delay: index * 0.15,
                          }}
                        >
                          <h3>
                            {player.name} {player.order === 1 && `(C)`}
                          </h3>
                          <FontAwesomeIcon icon={faArrowRight} size="lg" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="teaminfo-empty">
              <h3>No players found for this team.</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
}
