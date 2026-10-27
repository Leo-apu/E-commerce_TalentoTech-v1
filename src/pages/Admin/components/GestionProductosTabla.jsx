import { FiInbox } from "react-icons/fi";
import { GestionProductosFila } from "./GestionProductosFila";
import styles from "../AdminDashboardPage.module.css";

export function GestionProductosTabla({
  productos,
  cargando,
  onEditar,
  onEliminar,
}) {
  return (
    <div className={styles.tablaWrapper}>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "center", padding: "2rem" }}
              >
                Cargando catálogo desde Firebase...
              </td>
            </tr>
          ) : productos.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "center", padding: "2.5rem 1rem" }}
              >
                <FiInbox size={36} color="var(--color-text-tertiary)" />
                <p
                  style={{
                    margin: "0.5rem 0 0",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  No se encontraron productos coincidentes
                </p>
              </td>
            </tr>
          ) : (
            productos.map((prod) => (
              <GestionProductosFila
                key={prod.id}
                producto={prod}
                onEditar={onEditar}
                onEliminar={onEliminar}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
