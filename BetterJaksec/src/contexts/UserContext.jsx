import { createContext, useState, useEffect } from "react";
import { useAuthentication, useUser } from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";
//.
const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const result = await postLogin(credentials);

      localStorage.setItem("token", result.token);
      setUser(result);
      alert("Login successful");
      if (result.role === "admin") navigate("/admin");
      else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message || "Login failed");
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (e) {
      console.log("Logout failed:", e.message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const userData = await getUserByToken();
      setUser(userData);
    } catch (e) {
      console.log("Auto-login failed:", e.message);
      localStorage.removeItem("token");
      setUser(null);
    }
  };
  useEffect(() => {
    const tryAutoLogin = async () => {
      await handleAutoLogin();
    };
    tryAutoLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, handleLogin, handleLogout, handleAutoLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
