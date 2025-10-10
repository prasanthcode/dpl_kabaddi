import React, { useState } from "react";
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const ShareButton = ({
  url = window.location.href,
  title = document.title || "Check this out!",
  size = "medium",
  color = "default",
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => {
    setCopied(false);
    setAnchorEl(null);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
      `${title} ${url}`
    )}`;
    window.open(whatsappUrl, "_blank");
    handleClose();
  };

  return (
    <>
      <Tooltip title="Share">
        <IconButton
          onClick={handleClick}
          size={size}
          color={color}
          sx={{
            backdropFilter: "blur(6px)",
            borderRadius: "12px",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
            color: "white",
          }}
        >
          <ShareIcon />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 200,
            borderRadius: 3,
            p: 0.5,
            background: "#0b1120",
            color: "white",
          },
        }}
      >
        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <ContentCopyIcon fontSize="small" sx={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText
            primary={copied ? "Copied ✓" : "Copy Link"}
            primaryTypographyProps={{
              sx: { color: copied ? "#4caf50" : "white" },
            }}
          />
        </MenuItem>

        <MenuItem onClick={handleWhatsApp}>
          <ListItemIcon>
            <WhatsAppIcon fontSize="small" sx={{ color: "#25D366" }} />
          </ListItemIcon>
          <ListItemText primary="WhatsApp" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ShareButton;
