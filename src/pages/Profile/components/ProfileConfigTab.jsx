import { FiSettings } from "react-icons/fi";
import styles from "../ProfilePage.module.css";

export function ProfileConfigTab() {
  return (
    <div>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitulo}>Configuración de Cuenta</h2>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "3.5rem 1rem",
          color: "var(--color-text-secondary)",
        }}
      >
        <FiSettings
          size={44}
          style={{ opacity: 0.35, marginBottom: "1rem" }}
        />
        <h3 style={{ margin: "0 0 0.5rem", color: "var(--color-text)" }}>
          Sección en construcción
        </h3>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          Próximamente podrás gestionar tus notificaciones y preferencias de
          seguridad desde aquí.
        </p>
      </div>
    </div>
  );
}
