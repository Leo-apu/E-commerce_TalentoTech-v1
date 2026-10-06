import { Link } from "react-router-dom";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import styles from "../ProfilePage.module.css";

export function ProfileOrdersTab() {
  return (
    <div>
      <div className={styles.tabHeader}>
        <h2 className={styles.tabTitulo}>Mis Pedidos</h2>
      </div>
      <div
        style={{
          textAlign: "center",
          padding: "3rem 1rem",
          color: "#64748b",
        }}
      >
        <FiPackage
          size={48}
          style={{ opacity: 0.4, marginBottom: "1rem" }}
        />
        <h3 style={{ margin: "0 0 0.5rem", color: "#1e293b" }}>
          Aún no tienes pedidos registrados
        </h3>
        <p style={{ margin: "0 0 1.5rem", fontSize: "0.92rem" }}>
          Cuando realices una compra, podrás realizar el seguimiento aquí.
        </p>
        <Link
          to="/productos"
          className={styles.botonAccion}
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <FiShoppingBag size={17} />
          <span>Explorar productos</span>
        </Link>
      </div>
    </div>
  );
}
