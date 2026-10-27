import { FiShoppingBag } from "react-icons/fi";
import styles from "./CartDrawer.module.css";

export function CartDrawerEmpty({ onClose }) {
  return (
    <div className={styles.vacio}>
      <div className={styles.vacioIcono}>
        <FiShoppingBag size={48} />
      </div>
      <h3>Tu carrito está vacío</h3>
      <p>
        Explora nuestras categorías y encuentra tus productos favoritos.
      </p>
      <button className={styles.botonExplorar} onClick={onClose}>
        Explorar catálogo
      </button>
    </div>
  );
}
