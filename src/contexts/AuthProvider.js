import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AUTH_API from 'src/api/auth';
import { ROUTES } from 'src/routes';

export const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
  getUser: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    getUser();
  }, []);

  const logout = async () => {
    try {
      await AUTH_API.logout();
    } catch (error) {
      console.log(error);
    } finally {
      navigate(ROUTES.LOGIN);
    }
  };

  const value = { user, loading, logout, getUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContextProvider;
