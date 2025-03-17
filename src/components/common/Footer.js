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
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener"
            sx={{ color: "#fff" }}
          >
            <InstagramIcon />
          </IconButton>

          <IconButton
            component={Link}
            href="https://www.linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener"
            sx={{ color: "#fff" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Box>

        {/* Credit Section */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          Developed by <strong>Prasanth Gavvala</strong> & Contributors
        </Typography>
      </Container>
    </Box>
  );
}
