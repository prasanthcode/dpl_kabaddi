import React from "react";
import { Box, Container, Typography, IconButton, Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "var(--primary-dark)",
        color: "#fff",
        py: 3,
        mt: 4,
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="body2" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} DPL Kabaddi. All rights reserved.
        </Typography>

        {/* Social Media Links */}
        <Box>
          <IconButton
            component={Link}
            href="https://www.instagram.com/pintuuuuu_2?igsh=bHhwNXozdjN1amc2"
            target="_blank"
            rel="noopener"
            sx={{ color: "#fff" }}
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            component={Link}
            href="https://www.linkedin.com/in/prasanth-gavvala-442b4327b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener"
            sx={{ color: "#fff" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Box>

        {/* Credit Section */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          Developed by <strong>Prasanth Gavvala</strong> and Naveen Yamala
        </Typography>
      </Container>
    </Box>
  );
}
