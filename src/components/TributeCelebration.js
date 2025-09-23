import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Dialog, DialogContent, Typography, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getFinalWinner } from "../services/matchesApi";

export default function TributeCelebration() {
  const { width, height } = useWindowSize();
  const [open, setOpen] = useState(false);
  const [winner, setWinner] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const isDismissed = localStorage.getItem("tributeCelebrationDismissed");

    if (location.pathname === "/" && !isDismissed) {
      fetchWinner();
    }
  }, [location.pathname]);

  const fetchWinner = async () => {
    try {
      const response = await getFinalWinner();
      const data = await response.json();
      if (data?.matchId) {
        setWinner(data);
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching match winner:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setWinner(null), 500);
    localStorage.setItem("tributeCelebrationDismissed", "true");
  };

  return (
    <Box textAlign="center">
      <AnimatePresence>
        {winner && open && <Confetti width={width} height={height} />}
      </AnimatePresence>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent
          sx={{
            width: "80%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Typography variant="h5" fontWeight="bold" color="black" mt={3}>
                  🎊 Congratulations! 🎊
                </Typography>
                <Typography variant="h6" mt={2} color="black">
                  DPL 2K25 Boys Kabaddi Winners
                </Typography>

                {/* Team Logo */}
                <Box mt={3}>
                  <motion.img
                    style={{ borderRadius: "50%" }}
                    src={winner?.logo}
                    alt="Winning Team Logo"
                    width="100"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </Box>

                <Typography variant="h6" mt={2} color="black">
                  {winner?.name}
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
