import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AUTH_API from "src/api/auth";
import axios, { clearToken, getToken } from "src/api/custom-axios";
import { ROUTES } from "src/routes";

export const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
  getUser: () => {},
  setUser: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await AUTH_API.getUser();
      setUser(response.data ?? null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = getToken();
    console.log("token", token);
    if (token) {
      axios.defaults.headers.Authorization = `Bearer ${token}`;
      getUser();
    }
  }, []);

  const logout = async () => {
    try {
      await AUTH_API.logout();
      clearToken();
      setUser(null);
      navigate(ROUTES.HOME);
    } catch (error) {
      console.log(error);
    } finally {
      navigate(ROUTES.LOGIN);
    }
  };

  const value = { user, loading, logout, getUser, setUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
