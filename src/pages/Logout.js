import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";

export default function Logout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      color="error"
      startIcon={<LogoutIcon />}
      sx={{
        borderRadius: 2,
        textTransform: "none",
        fontWeight: 500,
        px: 2,
      }}
    >
      Logout
    </Button>
  );
}
