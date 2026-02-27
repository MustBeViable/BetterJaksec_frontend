import { createContext } from "react";
import { useUser } from "../hooks/AuthHooks";
import { useNavigate } from "react-router-dom";

const AdminContext = createContext(null);

const AdminProvider = ({ children }) => {
  const { getUserByToken } = useUser();
  const navigate = useNavigate();

  const checkPermission = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const adminData = await getUserByToken();
      if (adminData.role !== "admin") navigate("/");
    } catch (e) {
      console.log("Auto-login failed:", e.message);
      localStorage.removeItem("token");
    }
  };

  return (
    <AdminContext.Provider value={{ checkPermission }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider, AdminContext };
