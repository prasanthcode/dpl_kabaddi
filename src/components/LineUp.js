import React from "react";

export default function LineUp({ stats }) {
  return (
    <div className="match_lineup">
      <div className="top_players">
        <h3>Top Raiders</h3>
        {stats.topRaiders?.length > 0 ? (
          stats.topRaiders.map((raider, index) => (
            <div className="match_player" key={index}>
              <div className="match_p_info">
                <img
                  src={
                    raider.profilePic
                      ? `${
                          process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL +
                          raider.profilePic
                        }.jpg`
                      : "https://www.gravatar.com/avatar/?d=mp"
                  }
                  alt="No Pic"
                />
                <span>{raider.name}</span>
              </div>
              <span>{raider.totalRaidPoints}</span>
            </div>
          ))
        ) : (
          <p className="match_empty">No top raiders yet</p>
        )}
      </div>
      <div className="top_players">
        <h3>Top Defenders</h3>
        {stats.topDefenders?.length > 0 ? (
          stats.topDefenders.map((defender, index) => (
            <div className="match_player" key={index}>
              <div className="match_p_info">
                <img
                  src={
                    defender.profilePic
                      ? `${
                          process.env.REACT_APP_CLOUDINARY_FILE_BASE_URL +
                          defender.profilePic
                        }.jpg`
                      : "https://www.gravatar.com/avatar/?d=mp"
                  }
                  alt="No Pic"
                />

                <span>{defender.name}</span>
              </div>
              <span>{defender.totalDefensePoints}</span>
            </div>
          ))
        ) : (
          <p className="match_empty">No top defenders yet</p>
        )}
      </div>
    </div>
  );
}
