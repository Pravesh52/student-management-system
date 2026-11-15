import { createContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("sms_user")); }
    catch { return null; }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sms_token");
    if (!token) { setLoading(false); return; }
    authService.me()
      .then((data) => {
        const currentUser = data?.admin || data?.user || data?.data?.admin || data?.data?.user || data?.data || user;
        if (currentUser) {
          setUser(currentUser);
          localStorage.setItem("sms_user", JSON.stringify(currentUser));
        }
      })
      .catch(() => {
        localStorage.removeItem("sms_token");
        localStorage.removeItem("sms_user");
        setUser(null);
      })
      .finally(() => setLoading(false));
  // Run once on application startup.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    const token = data?.token || data?.data?.token;
    const currentUser = data?.admin || data?.user || data?.data?.admin || data?.data?.user;
    if (!token) throw new Error("Login response did not contain an authentication token.");
    localStorage.setItem("sms_token", token);
    if (currentUser) localStorage.setItem("sms_user", JSON.stringify(currentUser));
    setUser(currentUser || { email: credentials.email, name: "Admin", role: "admin" });
    return data;
  };

  const logout = () => {
    localStorage.removeItem("sms_token");
    localStorage.removeItem("sms_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, logout }}>
    {children}
  </AuthContext.Provider>;
}
