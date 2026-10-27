import { FiEdit2 } from "react-icons/fi";
import styles from "../ProfilePage.module.css";

export function ProfileDataTab({ usuario, onEditar }) {
  return (
    <div>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitulo}>Datos Personales</h2>
        <button
          type="button"
          className={styles.botonAccion}
          onClick={onEditar}
        >
          <FiEdit2 size={15} />
          <span>Editar información</span>
        </button>
      </div>

      <div className={styles.datosGrid}>
        <div className={styles.datoTile}>
          <span className={styles.datoLabel}>Nombre Completo</span>
          <span className={styles.datoValor}>{usuario.nombre}</span>
        </div>

        <div className={styles.datoTile}>
          <span className={styles.datoLabel}>Correo Electrónico</span>
          <span className={styles.datoValor}>{usuario.email}</span>
        </div>

        <div className={styles.datoTile}>
          <span className={styles.datoLabel}>Teléfono</span>
          <span className={styles.datoValor}>
            {usuario.telefono || "No registrado"}
          </span>
        </div>

        <div className={styles.datoTile}>
          <span className={styles.datoLabel}>DNI / Identificación</span>
          <span className={styles.datoValor}>
            {usuario.dni || "No registrado"}
          </span>
        </div>

        <div className={styles.datoTile}>
          <span className={styles.datoLabel}>Tipo de Cuenta</span>
          <span className={styles.datoValor}>
            {usuario.rol === "admin" ? "Administrador" : "Cliente"}
          </span>
        </div>
      </div>
    </div>
  );
}
