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
    localStorage.removeItem("user"); // opcional si guardas datos del usuario

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
  // si es admin, cliente, vendedor o logístico, siempre responde
  const authPing = async () => {
    return api.getMisTiendas(); // 💡 este endpoint ya funciona para todos
  };

  // 🛡️ VERIFICAR AUTENTICACIÓN
  const checkAuth = async () => {
    let token = localStorage.getItem("accessToken");

    // No hay token → intentar refrescar
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
      // Intentar validar token con endpoint universal
      await authPing();
      setUserRole(localStorage.getItem("role"));
    } catch {
      // Token falló → intentar refrescar una vez
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
