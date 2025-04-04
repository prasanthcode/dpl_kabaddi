import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { Dialog, DialogContent, Typography, Button, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/matches/final`);
      const data = await response.json();

      if (data.length > 0) {
        setWinner(data[0]); // Assuming only one final match winner
        setOpen(true);
      }
    } catch (error) {
      console.error("Error fetching match winner:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setWinner(null), 500); // Delay to smoothly remove Confetti
    localStorage.setItem("tributeCelebrationDismissed", "true");
  };

  return (
    <Box textAlign="center">
      {/* Confetti Effect Only When Open */}
      <AnimatePresence>
        {winner && open && <Confetti width={width} height={height} />}
      </AnimatePresence>

      {/* Pop-up with Animation */}
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
{/* 
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                  sx={{ mt: 3 }}
                >
                  Close
                </Button> */}
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
