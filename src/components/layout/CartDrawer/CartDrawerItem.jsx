import { FiTrash2, FiPlus, FiMinus } from "react-icons/fi";
import styles from "./CartDrawer.module.css";

export function CartDrawerItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className={styles.item}>
      <img
        src={item.imagen}
        alt={item.nombre}
        className={styles.itemImagen}
      />
      <div className={styles.itemInfo}>
        <div className={styles.itemHeader}>
          <h4 className={styles.itemNombre}>{item.nombre}</h4>
          <button
            className={styles.botonQuitar}
            onClick={() => onRemove(item.id)}
            aria-label={`Eliminar ${item.nombre}`}
          >
            <FiTrash2 size={16} />
          </button>
        </div>

        <p className={styles.itemPrecioUnitario}>
          ${item.precio.toLocaleString("es-AR")} c/u
        </p>

        <div className={styles.itemFooter}>
          <div className={styles.cantidadControles}>
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className={styles.btnCantidad}
              aria-label="Disminuir cantidad"
            >
              <FiMinus size={14} />
            </button>
            <span className={styles.cantidadNumero}>
              {item.cantidad}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className={styles.btnCantidad}
              aria-label="Aumentar cantidad"
            >
              <FiPlus size={14} />
            </button>
          </div>
          <span className={styles.itemSubtotal}>
            ${(item.precio * item.cantidad).toLocaleString("es-AR")}
          </span>
        </div>
      </div>
    </div>
  );
}
