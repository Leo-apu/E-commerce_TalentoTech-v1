import { FiCheckCircle } from "react-icons/fi";
import styles from "./CartDrawer.module.css";

export function CartDrawerShipping({ totalPrice }) {
  const envioGratisDesde = 50000;
  const faltaParaEnvio = Math.max(0, envioGratisDesde - totalPrice);
  const porcentajeEnvio = Math.min(100, (totalPrice / envioGratisDesde) * 100);

  return (
    <div className={styles.envioBarraContenedor}>
      <div className={styles.envioTexto}>
        {faltaParaEnvio > 0 ? (
          <span>
            Te faltan{" "}
            <strong>${faltaParaEnvio.toLocaleString("es-AR")}</strong>{" "}
            para <strong>Envío Gratis</strong>
          </span>
        ) : (
          <span className={styles.envioConseguido}>
            <FiCheckCircle
              size={15}
              style={{ verticalAlign: "middle", marginRight: "0.3rem" }}
            />
            ¡Felicidades! Tienes <strong>Envío Gratis</strong>
          </span>
        )}
      </div>
      <div className={styles.barraFondo}>
        <div
          className={styles.barraProgreso}
          style={{ width: `${porcentajeEnvio}%` }}
        />
      </div>
    </div>
  );
}
