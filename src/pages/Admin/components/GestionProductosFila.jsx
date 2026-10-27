import {
  FiTrash2,
  FiEdit3,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";
import styles from "../AdminDashboardPage.module.css";

export function GestionProductosFila({ producto, onEditar, onEliminar }) {
  const renderStockBadge = (stock) => {
    const cantidad = Number(stock) ?? 0;
    if (cantidad <= 0) {
      return (
        <span className={styles.badgeStockAgotado}>
          <FiXCircle size={13} />
          <span>Sin stock</span>
        </span>
      );
    }
    if (cantidad < 10) {
      return (
        <span className={styles.badgeStockBajo}>
          <FiAlertTriangle size={13} />
          <span>{cantidad} u. (Bajo)</span>
        </span>
      );
    }
    return (
      <span className={styles.badgeStockOk}>
        <FiCheckCircle size={13} />
        <span>{cantidad} u.</span>
      </span>
    );
  };

  return (
    <tr>
      <td className={styles.colProducto}>
        <img
          src={producto.imagen || "https://picsum.photos/400/400"}
          alt={producto.nombre}
          className={styles.prodImg}
        />
        <span className={styles.prodNombre}>{producto.nombre}</span>
      </td>
      <td>
        <span className={styles.categoriaBadge}>{producto.categoria}</span>
      </td>
      <td>
        <strong>${producto.precio?.toLocaleString("es-AR")}</strong>
      </td>
      <td>{renderStockBadge(producto.stock)}</td>
      <td>
        <button
          className={styles.btnEditar}
          onClick={() => onEditar(producto)}
        >
          <FiEdit3 size={14} style={{ marginRight: "0.3rem" }} />
          Editar
        </button>
        <button
          className={styles.btnEliminar}
          onClick={() => onEliminar(producto.id, producto.nombre)}
          aria-label="Eliminar producto"
          style={{ marginLeft: "0.4rem" }}
        >
          <FiTrash2 size={15} />
        </button>
      </td>
    </tr>
  );
}
