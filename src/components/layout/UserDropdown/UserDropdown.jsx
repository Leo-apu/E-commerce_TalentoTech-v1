import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiLogIn, FiUserPlus, FiLogOut, FiSettings } from "react-icons/fi";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";
import styles from "./UserDropdown.module.css";

function UserDropdown() {
  const [abierto, setAbierto] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleCerrarSesion = async () => {
    try {
      await logout();
      setAbierto(false);
      toast.success("Has cerrado sesión correctamente");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Error al cerrar sesión");
    }
  };

  return (
    <div
      className={styles.dropdownContainer}
      onMouseEnter={() => setAbierto(true)}
      onMouseLeave={() => setAbierto(false)}
    >
      <button
        type="button"
        className={styles.triggerBtn}
        onClick={() => setAbierto((prev) => !prev)}
        aria-label={user ? `Menú de ${user.nombre}` : "Mi Cuenta"}
        aria-expanded={abierto}
      >
        {user?.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.nombre}
            className={styles.avatarNav}
            referrerPolicy="no-referrer"
          />
        ) : (
          <FiUser size={21} className={styles.userIconNav} />
        )}

      </button>

      {abierto && (
        <>
          <div
            className={styles.backdrop}
            onClick={() => setAbierto(false)}
          />
          <div className={styles.menuFlotante} role="menu">
            {user ? (
              <>
                <div className={styles.headerDropdown}>
                  <h4 className={styles.titulo}>Hola, {user.nombre}</h4>
                </div>
                <div className={styles.opcionesLista}>
                  {user.rol === "admin" && (
                    <Link
                      to="/admin"
                      className={styles.itemOpcion}
                      onClick={() => setAbierto(false)}
                    >
                      <FiSettings size={18} className={styles.icono} />
                      <span>Panel Admin</span>
                    </Link>
                  )}
                  <Link
                    to="/perfil"
                    className={styles.itemOpcion}
                    onClick={() => setAbierto(false)}
                  >
                    <FiUser size={18} className={styles.icono} />
                    <span>Mi Perfil</span>
                  </Link>
                  <div className={styles.separador} />
                  <button
                    type="button"
                    className={styles.itemOpcion}
                    onClick={handleCerrarSesion}
                  >
                    <FiLogOut size={18} className={styles.icono} />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className={styles.headerDropdown}>
                  <h4 className={styles.titulo}>Mi Cuenta</h4>
                </div>
                <div className={styles.opcionesLista}>
                  <Link
                    to="/login"
                    className={styles.itemOpcion}
                    onClick={() => setAbierto(false)}
                  >
                    <FiLogIn size={18} className={styles.icono} />
                    <span>Iniciar Sesión</span>
                  </Link>
                  <Link
                    to="/registro"
                    className={styles.itemOpcion}
                    onClick={() => setAbierto(false)}
                  >
                    <FiUserPlus size={18} className={styles.icono} />
                    <span>Registrarse</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default UserDropdown;

