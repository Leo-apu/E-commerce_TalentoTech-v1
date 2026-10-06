import { FiArrowRight, FiShield, FiTruck } from "react-icons/fi";
import styles from "../CartPage.module.css";
import toast from "react-hot-toast";

export function CartSummary({ totalPrice, totalItems }) {
  const envioGratisDesde = 50000;
  const tieneEnvioGratis = totalPrice >= envioGratisDesde;
  const faltaParaEnvio = Math.max(0, envioGratisDesde - totalPrice);

  return (
    <div className={styles.resumenCard}>
      <h3>Resumen de compra</h3>

      <div className={styles.resumenFila}>
        <span>Subtotal ({totalItems} productos)</span>
        <strong>${totalPrice.toLocaleString("es-AR")}</strong>
      </div>

      <div className={styles.resumenFila}>
        <span>Envío</span>
        {tieneEnvioGratis ? (
          <span className={styles.envioGratisBadge}>Gratis</span>
        ) : (
          <span>A calcular</span>
        )}
      </div>

      {!tieneEnvioGratis && (
        <div className={styles.envioAviso}>
          <FiTruck size={16} />
          <span>
            Agrega <strong>${faltaParaEnvio.toLocaleString("es-AR")}</strong> para
            obtener <strong>Envío Gratis</strong>.
          </span>
        </div>
      )}

      <div className={styles.separador} />

      <div className={styles.totalFila}>
        <span>Total</span>
        <strong className={styles.precioFinal}>
          ${totalPrice.toLocaleString("es-AR")}
        </strong>
      </div>

      <button
        className={styles.botonPagar}
        onClick={() =>
          toast.success(
            "¡Gracias por tu compra! Redirigiendo a pasarela de pago.",
          )
        }
      >
        <span>Finalizar Compra</span>
        <FiArrowRight size={18} />
      </button>

      <div className={styles.seguridadGarantia}>
        <FiShield size={16} />
        <span>Compra protegida y encriptada</span>
      </div>
    </div>
  );
}
