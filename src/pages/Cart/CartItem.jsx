import { Link } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import styles from "./CartPage.module.css";

export function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className={styles.itemCard}>
      <Link to={`/producto/${item.id}`}>
        <img
          src={item.imagen}
          alt={item.nombre}
          className={styles.itemImagen}
        />
      </Link>

      <div className={styles.itemDetalles}>
        <div className={styles.itemHeader}>
          <Link to={`/producto/${item.id}`} className={styles.itemNombreLink}>
            <h3>{item.nombre}</h3>
          </Link>
          <button
            className={styles.botonEliminar}
            onClick={() => onRemove(item.id)}
            aria-label="Eliminar producto"
          >
            <FiTrash2 size={18} />
          </button>
        </div>

        <p className={styles.itemPrecioUnitario}>
          ${item.precio.toLocaleString("es-AR")} por unidad
        </p>

        <div className={styles.itemAcciones}>
          <div className={styles.controlCantidad}>
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className={styles.btnQty}
              aria-label="Restar una unidad"
            >
              <FiMinus size={14} />
            </button>
            <span className={styles.qtyNumero}>{item.cantidad}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className={styles.btnQty}
              aria-label="Sumar una unidad"
            >
              <FiPlus size={14} />
            </button>
          </div>

          <div className={styles.itemSubtotal}>
            <span>Subtotal:</span>
            <strong>
              ${(item.precio * item.cantidad).toLocaleString("es-AR")}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
