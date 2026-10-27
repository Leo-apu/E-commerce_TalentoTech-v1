import { Link } from "react-router-dom";
import { FiTrash2, FiArrowLeft } from "react-icons/fi";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import styles from "../CartPage.module.css";

export function CartContent({
  cartItems,
  removeFromCart,
  updateQuantity,
  clearCart,
  totalPrice,
  totalItems,
}) {
  return (
    <div className={styles.contenedor}>
      <div className={styles.cabecera}>
        <div>
          <h1 className={styles.titulo}>Carrito de Compras</h1>
          <p className={styles.subtitulo}>
            {totalItems} productos seleccionados
          </p>
        </div>
        <button className={styles.botonVaciar} onClick={clearCart}>
          <FiTrash2 size={16} />
          <span>Vaciar carrito</span>
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.itemsColumna}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}

          <Link to="/productos" className={styles.linkSeguirComprando}>
            <FiArrowLeft size={16} />
            <span>Continuar comprando</span>
          </Link>
        </div>

        <div className={styles.resumenColumna}>
          <CartSummary
            totalPrice={totalPrice}
            totalItems={totalItems}
          />
        </div>
      </div>
    </div>
  );
}

