import { useState } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

import "../admin.css";

import PlayerSelector from "../components/PlayerSelector";
import ActionScorePanel from "../components/ActionScorePanel";
import ScoreBoard from "../components/ScoreBoard";
import UndoButton from "../components/UndoButton";
import { useScores } from "../../hooks/useScores";
import TimeSelection from "../components/TimeSelection";

export default function AddScore() {
  const { matchId } = useParams();

  const {
    players,
    score,
    loading,
    error,
    addPlayerScore,
    addTeamScore,
    undoLastAction,
  } = useScores(matchId);

  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedScore, setSelectedScore] = useState(null);
  const [rd, setRd] = useState(false);
  const [isTeam, setIsTeam] = useState(false);
  const [scoreLoading, setScoreLoading] = useState(false);

  const [btnPosition, setBtnPosition] = useState({
    top: 0,
    left: 0,
    visible: false,
    align: "right",
  });

  const [lastAction, setLastAction] = useState(null);

  const handlePlayerChange = (event, newSelected, columnIndex, teamId) => {
    if (newSelected !== null) {
      setSelectedPlayer(newSelected);

      if (newSelected === teamId) {
        setSelectedAction(null);
        setIsTeam(true);
        setRd(false);
      } else {
        setRd(true);
        setSelectedAction(null);
        setSelectedScore(null);
        setIsTeam(false);
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const buttonHeight = 220;
      const marginBottom = 20;
      let newTop = rect.top + window.scrollY;

      if (
        newTop + buttonHeight + marginBottom >
        windowHeight + window.scrollY
      ) {
        newTop = rect.top + window.scrollY - buttonHeight - 10;
      }

      setBtnPosition({
        top: newTop,
        left: columnIndex === 0 ? rect.right - 20 : rect.left - 200,
        visible: true,
        align: columnIndex === 0 ? "right" : "left",
      });
    }
  };

  const handleSubmit = async () => {
    if (isTeam && selectedScore === null) return;
    if (!isTeam && (selectedAction === null || selectedScore === null)) return;

    setScoreLoading(true);

    try {
      if (isTeam) {
        await addTeamScore({
          matchId,
          teamId: selectedPlayer,
          points: parseInt(selectedScore, 10),
        });
        const teamName =
          selectedPlayer === players.teamAId
            ? players.teamAName
            : players.teamBName;
        setLastAction({
          name: teamName,
          points: selectedScore,
        });
      } else {
        await addPlayerScore({
          matchId,
          playerId: selectedPlayer,
          points: parseInt(selectedScore, 10),
          type: selectedAction === "R" ? "raid" : "defense",
        });
        const player = players.teamAPlayers
          .concat(players.teamBPlayers)
          .find((p) => p._id === selectedPlayer);
        setLastAction({
          name: player ? player.name : "",
          points: selectedScore,
          type: selectedAction === "R" ? "raid" : "defense",
        });
      }
    } catch (err) {
      console.error("Error submitting score:", err);
    } finally {
      setScoreLoading(false);
    }

    resetSelection();
  };

  const handleUndo = async () => {
    try {
      await undoLastAction();
      setLastAction(null); // Clear after undo
    } catch (err) {
      console.error("Undo failed:", err);
    }
  };

  const resetSelection = () => {
    setSelectedPlayer(null);
    setSelectedAction(null);
    setSelectedScore(null);
    setBtnPosition({ top: 0, left: 0, visible: false, align: "right" });
  };

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Box position="relative">
        {/* Teams & Players */}
        <Box display="flex" justifyContent="center" gap={5}>
          {[
            {
              players: players.teamAPlayers,
              teamName: players.teamAName,
              teamId: players.teamAId,
            },
            {
              players: players.teamBPlayers,
              teamName: players.teamBName,
              teamId: players.teamBId,
            },
          ].map((team, teamIndex) => (
            <PlayerSelector
              key={team.teamId}
              {...team}
              selectedPlayer={selectedPlayer}
              handlePlayerChange={handlePlayerChange}
              teamIndex={teamIndex}
            />
          ))}
        </Box>

        {/* Floating Action + Score Panel */}
        {btnPosition.visible && (
          <ActionScorePanel
            btnPosition={btnPosition}
            selectedAction={selectedAction}
            setSelectedAction={setSelectedAction}
            selectedScore={selectedScore}
            setSelectedScore={setSelectedScore}
            handleSubmit={handleSubmit}
            scoreLoading={scoreLoading}
            rd={rd}
          />
        )}

        {/* ScoreBoard */}
        <ScoreBoard
          score={score}
          handleCloseSubmit={resetSelection}
          teams={{ teamA: players.teamAName, teamB: players.teamBName }}
        />
        {/* Undo */}
        <Box mt={1}>
          <UndoButton handleUndo={handleUndo} lastAction={lastAction} />
        </Box>

        {/* Timer */}
        <TimeSelection matchId={matchId} />
      </Box>
    </>
  );
}
