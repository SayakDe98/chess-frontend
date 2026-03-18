import { createContext, useContext, useState } from "react";

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}

function readUsername() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = parseJwt(token);
  return payload?.username || payload?.name || null;
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [username, setUsername] = useState(readUsername);

  function login(token) {
    localStorage.setItem("token", token);
    const payload = parseJwt(token);
    setUsername(payload?.username || payload?.name || null);
  }

  function logout() {
    localStorage.removeItem("token");
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
