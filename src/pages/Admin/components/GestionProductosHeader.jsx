import { FiPlus, FiRefreshCw } from "react-icons/fi";
import styles from "../AdminDashboardPage.module.css";

export function GestionProductosHeader({
  totalProductos,
  cargando,
  onRecargar,
  onNuevoProducto,
}) {
  return (
    <div className={styles.tablaHeader}>
      <div>
        <h3>Gestión de Catálogo</h3>
        <p>{totalProductos} productos registrados en Firestore</p>
      </div>
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button
          className={styles.btnEditar}
          onClick={onRecargar}
          title="Recargar catálogo"
          aria-label="Recargar catálogo"
        >
          <FiRefreshCw size={15} className={cargando ? "spin" : ""} />
        </button>
        <button className={styles.btnNuevo} onClick={onNuevoProducto}>
          <FiPlus size={16} />
          <span>Nuevo Producto</span>
        </button>
      </div>
    </div>
  );
}
