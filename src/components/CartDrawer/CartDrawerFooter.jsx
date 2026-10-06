import { FiArrowRight } from "react-icons/fi";
import styles from "./CartDrawer.module.css";
import toast from "react-hot-toast";

export function CartDrawerFooter({ totalPrice }) {
  return (
    <div className={styles.footer}>
      <div className={styles.totalRow}>
        <span>Subtotal</span>
        <span className={styles.precioTotal}>
          ${totalPrice.toLocaleString("es-AR")}
        </span>
      </div>
      <p className={styles.impuestosNota}>
        Envío e impuestos calculados en el checkout
      </p>
      <button
        className={styles.botonCheckout}
        onClick={() =>
          toast.success("¡Redirigiendo a pasarela de pago segura!")
        }
      >
        <span>Iniciar Compra</span>
        <FiArrowRight size={18} />
      </button>
    </div>
  );
}
