import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user info from localStorage if present
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Save user and token to localStorage when changed
  useEffect(() => {
    if (user && token) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user, token]);

  const login = (tokenValue, userData) => {
    setToken(tokenValue);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user,setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
