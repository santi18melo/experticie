import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export const useAuth = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);
  const [loading, setLoading] = useState(true);

  // 🔥 LOGOUT UNIVERSAL PARA TODOS LOS USUARIOS
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    setUserRole(null);
    navigate("/login", { replace: true });
  };

  // 🔄 INTENTAR REFRESCAR TOKEN
  const refreshToken = async () => {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) return false;

    try {
      const response = await api.post("/auth/refresh/", { refresh });

      const newAccess =
        response.access ||
        response.data?.access ||
        response.data?.accessToken;

      if (!newAccess) return false;

      localStorage.setItem("accessToken", newAccess);
      return true;
    } catch {
      return false;
    }
  };

  // 🔥 ENDPOINT UNIVERSAL QUE FUNCIONA SEGÚN EL ROL
  const authPing = async () => {
    return api.getMisTiendas();
  };

  // 🛡️ VERIFICAR AUTENTICACIÓN
  const checkAuth = async () => {
    let token = localStorage.getItem("accessToken");

    if (!token) {
      const refreshed = await refreshToken();
      if (!refreshed) {
        logout();
        setLoading(false);
        return;
      }
      token = localStorage.getItem("accessToken");
    }

    try {
      await authPing();
      setUserRole(localStorage.getItem("role"));
    } catch {
      const refreshed = await refreshToken();

      if (refreshed) {
        try {
          await authPing();
          setUserRole(localStorage.getItem("role"));
        } catch {
          logout();
        }
      } else {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return { userRole, loading, logout };
};

// ✅ Export default usando el MISMO hook
export default useAuth;
