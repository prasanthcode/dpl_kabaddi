import { createContext, useState } from "react";
import { getAuthToken } from "../services/authApi";
import {
  getUser,
  setUser,
  clearUser,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
  clearTokens,
} from "../utils/authStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(getUser());
  const [token, setTokenState] = useState(getAccessToken());

  const login = async (email, password) => {
    try {
      const res = await getAuthToken({ email, password });

      setUserState(res.data.user);
      setTokenState(res.data.accessToken);
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      setRefreshToken(res.data.refreshToken);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    setUserState(null);
    setTokenState(null);
    clearUser();
    clearTokens();
    window.location.href = "/login"; // redirect
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
