import { FiX, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../../context/CartContext";
import { CartDrawerShipping } from "./CartDrawerShipping";
import { CartDrawerEmpty } from "./CartDrawerEmpty";
import { CartDrawerItem } from "./CartDrawerItem";
import { CartDrawerFooter } from "./CartDrawerFooter";
import styles from "./CartDrawer.module.css";

function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className={styles.overlay}
        onClick={closeCart}
      />
      <aside className={styles.drawer}>
        <div className={styles.header}>
          <div className={styles.headerTitulo}>
            <FiShoppingBag size={22} />
            <h2>Tu Carrito</h2>
            <span className={styles.contadorBadge}>{totalItems}</span>
          </div>
          <button
            className={styles.botonCerrar}
            onClick={closeCart}
            aria-label="Cerrar carrito"
          >
            <FiX size={22} />
          </button>
        </div>

        <CartDrawerShipping totalPrice={totalPrice} />

        {cartItems.length === 0 ? (
          <CartDrawerEmpty onClose={closeCart} />
        ) : (
          <div className={styles.itemsLista}>
            {cartItems.map((item) => (
              <CartDrawerItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <CartDrawerFooter totalPrice={totalPrice} />
        )}
      </aside>
    </>
  );
}

export default CartDrawer;

