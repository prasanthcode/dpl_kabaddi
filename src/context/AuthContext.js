import { createContext, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../services/authApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(
    () => localStorage.getItem("accessToken") || null
  );

  const login = async (email, password) => {
    try {
      const res = await getAuthToken({ email, password })
      setUser(res.data.user);
      setToken(res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
