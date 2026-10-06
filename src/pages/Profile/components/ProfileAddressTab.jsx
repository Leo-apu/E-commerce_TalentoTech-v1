import { FiEdit2 } from "react-icons/fi";
import styles from "../ProfilePage.module.css";

export function ProfileAddressTab({ usuario, onEditar }) {
  return (
    <div>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitulo}>Mis Direcciones</h2>
        <button
          type="button"
          className={styles.botonAccion}
          onClick={onEditar}
        >
          <FiEdit2 size={15} />
          <span>Modificar dirección</span>
        </button>
      </div>

      <div className={styles.direccionCard}>
        <h3 className={styles.direccionTitulo}>
          Dirección de entrega predeterminada
        </h3>
        <p className={styles.direccionTexto}>
          {usuario.direccion?.calle || "No registrada"}
        </p>
        <p className={styles.direccionTexto}>
          {usuario.direccion?.ciudad || "Ciudad no especificada"}
          {usuario.direccion?.provincia ? `, ${usuario.direccion.provincia}` : ""}
        </p>
        <p className={styles.direccionTexto}>
          Código Postal: {usuario.direccion?.codigoPostal || "No especificado"}
        </p>
      </div>
    </div>
  );
}
