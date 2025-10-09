import React from "react";
import {
  Box,
  Container,
  Card,
  Typography,
  Avatar,
  IconButton,
  Stack,
  Divider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const profiles = [
  {
    name: "Prasanth Gavvala",
    role: "Full-Stack Developer | Development & Deployment",
    image:
      "https://res.cloudinary.com/dbs1mjd6b/image/upload/v1759909749/uploads/ukri1h6adjte72a4l06r.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/prasanth-gavvala-442b4327b",
      instagram: "https://www.instagram.com/pintuuuuu_2",
    },
  },
  {
    name: "Naveen Yamala",
    role: "Quality Assurance | Testing & Score Management",
    image:
      "https://res.cloudinary.com/dzwksifmb/image/upload/c_crop,w_1200,h_1200,ar_1:1,g_auto/v1742537900/Nazooo_rwdlag.jpg",
    social: {
      linkedin: "https://www.linkedin.com/in/naveen-yamala-3a3b4227b",
      instagram: "https://www.instagram.com/naveen_yamala",
    },
  },
  {
    name: "Chandra Sekhar G",
    role: "Graphic Designer | Branding & Digital Media",
    image:
      "https://res.cloudinary.com/dzvhvgifb/image/upload/v1742535814/WhatsApp_Image_2025-03-21_at_10.35.41_AM_h3jqpa.jpg",
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
    <Box
      sx={{
        bgcolor: "#0b1120",
        py: 6,
        color: "white",
        textAlign: "center",
        boxShadow: "0px -5px 20px rgba(0,0,0,0.4)",
      }}
    >
      <Container maxWidth="lg">
        {/* Team Section */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            letterSpacing: 0.5,
            mb: 4,
            textTransform: "uppercase",
            color: "white",
          }}
        >
          Our Team
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="center"
          alignItems={{ xs: "center", sm: "stretch" }}
          flexWrap="wrap"
        >
          {profiles.map((profile, index) => (
            <Card
              key={index}
              sx={{
                flex: 1,
                minWidth: 250,
                maxWidth: 300,
                width: { xs: "80%", sm: 250, md: 300 },
                bgcolor: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                borderRadius: 3,
                p: 4,
                textAlign: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 8px 25px rgba(0,0,0,0.3)",
                },
              }}
            >
              <Avatar
                src={profile.image}
                sx={{
                  width: 90,
                  height: 90,
                  mx: "auto",
                  mb: 2,
                  border: "2px solid white",
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {profile.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 1 }}>
                {profile.role}
              </Typography>

              {/* Social Links */}
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                sx={{ mt: 1 }}
              >
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
                        "&:hover": { bgcolor: "rgba(0,188,212,0.1)" },
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

        {/* Divider */}
        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.2)" }} />

        {/* Follow Section */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Follow DPL on
          </Typography>
          <IconButton
            component="a"
            href="https://www.instagram.com/dpl_masters_edition?igsh=MTF6dm9tbzZsZXp6bA=="
            target="_blank"
            sx={{
              color: "white",
              "&:hover": { bgcolor: "rgba(0,188,212,0.1)" },
            }}
          >
            <InstagramIcon fontSize="medium" />
          </IconButton>
        </Stack>

        {/* Copyright */}
        <Typography variant="body2" sx={{ mt: 3, opacity: 0.7 }}>
          © {new Date().getFullYear()} <strong>DPL Kabaddi</strong>. All rights
          reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
