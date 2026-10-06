import { Link } from "react-router-dom";
import { FiShoppingBag, FiArrowLeft } from "react-icons/fi";
import styles from "../CartPage.module.css";

export function CartEmpty() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.vacioCard}>
        <div className={styles.vacioIconoWrapper}>
          <FiShoppingBag size={48} />
        </div>
        <h2>Tu carrito está vacío</h2>
        <p>
          ¿No sabes qué comprar? ¡Miles de productos te esperan en nuestro
          catálogo!
        </p>
        <Link to="/productos" className={styles.botonExplorar}>
          <FiArrowLeft size={18} />
          <span>Ver todos los productos</span>
        </Link>
      </div>
    </div>
  );
}
