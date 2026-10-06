import { FiPackage, FiUser, FiMapPin, FiSettings } from "react-icons/fi";
import styles from "../ProfilePage.module.css";

export function ProfileSidebar({ tabActiva, onSelectTab }) {
  return (
    <aside className={styles.sidebarNav}>
      <button
        type="button"
        className={`${styles.tabBtn} ${tabActiva === "pedidos" ? styles.tabActivo : ""}`}
        onClick={() => onSelectTab("pedidos")}
      >
        <FiPackage size={18} />
        <span>Mis Pedidos</span>
      </button>

      <button
        type="button"
        className={`${styles.tabBtn} ${tabActiva === "datos" ? styles.tabActivo : ""}`}
        onClick={() => onSelectTab("datos")}
      >
        <FiUser size={18} />
        <span>Datos Personales</span>
      </button>

      <button
        type="button"
        className={`${styles.tabBtn} ${tabActiva === "direcciones" ? styles.tabActivo : ""}`}
        onClick={() => onSelectTab("direcciones")}
      >
        <FiMapPin size={18} />
        <span>Direcciones</span>
      </button>

      <button
        type="button"
        className={`${styles.tabBtn} ${tabActiva === "config" ? styles.tabActivo : ""}`}
        onClick={() => onSelectTab("config")}
      >
        <FiSettings size={18} />
        <span>Configuración</span>
      </button>
    </aside>
  );
}
