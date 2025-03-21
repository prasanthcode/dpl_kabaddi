import React from "react";
import { Box, Container, Card, Typography, Avatar, IconButton, Stack, Divider } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const profiles = [
  {
    name: "Prasanth Gavvala",
    role: "Full-Stack Developer | Development & Deployment",
    image: "https://res.cloudinary.com/dzvhvgifb/image/upload/v1742535814/WhatsApp_Image_2025-03-21_at_10.35.42_AM_kwx9hk.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/prasanth-gavvala-442b4327b",
      instagram: "https://www.instagram.com/pintuuuuu_2",
    },
  },
  {
    name: "Naveen Yamala",
    role: "Sports-Tech Coordinator | Live Score Updation & QA",
    image: "https://res.cloudinary.com/dzwksifmb/image/upload/c_crop,w_1200,h_1200,ar_1:1,g_auto/v1742537900/Nazooo_rwdlag.jpg",
    social: {
      instagram: "https://www.instagram.com/naveen_yamala",
    },
  },
  {
    name: "Chandra Sekhar G",
    role: "Graphic Designer | Branding & Digital Media",
    image: "https://res.cloudinary.com/dzvhvgifb/image/upload/v1742535814/WhatsApp_Image_2025-03-21_at_10.35.41_AM_h3jqpa.jpg",
    social: {
      instagram: "https://www.instagram.com/mr_confused_03",
    },
  },
];

// Social media icons mapping
const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  twitter: TwitterIcon,
  instagram: InstagramIcon,
};

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#121c2d", py: 4, color: "white", textAlign: "center", borderRadius: 2 }}>
      <Container maxWidth="md">
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="center">
          {profiles.map((profile, index) => (
            <Card
              key={index}
              sx={{
                textAlign: "center",
                p: 3,
                flex: 1,
                minWidth: 250,
                bgcolor: "var(--primary-color-dark)",
                color: "white",
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)",
              }}
            >
              <Avatar src={profile.image} sx={{ width: 80, height: 80, mx: "auto", mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {profile.role}
              </Typography>
              {/* Render only available social links */}
              <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                {Object.entries(profile.social).map(([key, url]) => {
                  const Icon = socialIcons[key];
                  return (
                    <IconButton
                      key={key}
                      component="a"
                      href={url}
                      target="_blank"
                      sx={{
                        color: "white",
                        "&:hover": { bgcolor: "#1e3a5a" },
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  );
                })}
              </Stack>
            </Card>
          ))}
        </Stack>

        {/* Follow DPL on Instagram Section */}
        <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.3)" }} />
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Follow DPL on
          </Typography>
          <IconButton
            component="a"
            href="https://www.instagram.com/dpl_masters_edition?igsh=MTF6dm9tbzZsZXp6bA=="
            target="_blank"
            sx={{
              color: "white",
              "&:hover": { bgcolor: "#1e3a5a" },
            }}
          >
            <InstagramIcon fontSize="medium" />
          </IconButton>
        </Stack>

        {/* Copyright */}
        <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
          © {new Date().getFullYear()} DPL Kabaddi. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
