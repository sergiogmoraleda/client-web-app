import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Lógica de autenticación con tu API GraphQL
    // Por ejemplo, verificación del token JWT o llamadas a la API para comprobar la autenticación

    // Si el usuario está autenticado, actualiza el estado a true
    // Si el usuario no está autenticado, actualiza el estado a false

    // Ejemplo de uso de localStorage para almacenar el token
    const token = localStorage.getItem("token");

    if (token) {
      // Realiza la lógica de autenticación aquí
      // Por ejemplo, verifica el token con tu API GraphQL y actualiza el estado en consecuencia
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = () => {
    // Lógica para iniciar sesión
    // Por ejemplo, realizar llamadas a tu API GraphQL para autenticar al usuario
    // Actualiza el estado isAuthenticated y redirige al usuario a la página principal
    setIsAuthenticated(true);
    navigate("/cuenta");
  };

  const logout = () => {
    // Lógica para cerrar sesión
    // Por ejemplo, eliminar el token del almacenamiento local
    // Actualiza el estado isAuthenticated y redirige al usuario a la página de inicio de sesión
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/home");
  };

  return { isAuthenticated, login, logout };
};

export default useAuth;
