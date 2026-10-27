import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiBox,
  FiTrendingUp,
  FiArrowRight,
  FiAlertTriangle,
  FiPlus,
} from "react-icons/fi";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import styles from "./AdminDashboardPage.module.css";

function AdminDashboardPage() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchResumen = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));
        if (!snapshot.empty) {
          const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
          setProductos(docs);
        }
      } catch (error) {
        console.error("Error al cargar resumen:", error);
      } finally {
        setCargando(false);
      }
    };
    fetchResumen();
  }, []);

  const categoriasUnicas = new Set(
    productos.map((p) => p.categoria?.toLowerCase()).filter(Boolean),
  ).size;

  const productosBajoStock = productos.filter((p) => (p.stock || 0) <= 3);
  const ultimosProductos = productos.slice(0, 5);

  return (
    <div className={styles.dashboard}>
      {/* Grid de Métricas Principales */}
      <div className={styles.metricasGrid}>
        <div className={styles.metricaCard}>
          <div
            className={styles.metricaIcono}
            style={{ backgroundColor: "#ecfdf5", color: "#10b981" }}
          >
            <FiDollarSign size={22} />
          </div>
          <div className={styles.metricaInfo}>
            <span className={styles.metricaTitulo}>Ventas del Mes</span>
            <strong className={styles.metricaValor}>$1.840.500</strong>
            <span className={styles.metricaTendencia}>
              <FiTrendingUp size={14} /> +18.2% vs mes anterior
            </span>
          </div>
        </div>

        <div className={styles.metricaCard}>
          <div
            className={styles.metricaIcono}
            style={{ backgroundColor: "#eff6ff", color: "#3b82f6" }}
          >
            <FiShoppingBag size={22} />
          </div>
          <div className={styles.metricaInfo}>
            <span className={styles.metricaTitulo}>Pedidos Nuevos</span>
            <strong className={styles.metricaValor}>48 órdenes</strong>
            <span
              className={styles.metricaTendencia}
              style={{ color: "#3b82f6" }}
            >
              6 pendientes de envío
            </span>
          </div>
        </div>

        <div className={styles.metricaCard}>
          <div
            className={styles.metricaIcono}
            style={{ backgroundColor: "#fdf4ff", color: "#a855f7" }}
          >
            <FiUsers size={22} />
          </div>
          <div className={styles.metricaInfo}>
            <span className={styles.metricaTitulo}>Clientes Activos</span>
            <strong className={styles.metricaValor}>342</strong>
            <span
              className={styles.metricaTendencia}
              style={{ color: "#a855f7" }}
            >
              +14 esta semana
            </span>
          </div>
        </div>

        <div className={styles.metricaCard}>
          <div
            className={styles.metricaIcono}
            style={{ backgroundColor: "#fff7ed", color: "#f97316" }}
          >
            <FiBox size={22} />
          </div>
          <div className={styles.metricaInfo}>
            <span className={styles.metricaTitulo}>Productos en Catálogo</span>
            <strong className={styles.metricaValor}>
              {cargando ? "..." : `${productos.length} artículos`}
            </strong>
            <span
              className={styles.metricaTendencia}
              style={{ color: "#f97316" }}
            >
              {categoriasUnicas} categorías
            </span>
          </div>
        </div>
      </div>

      {/* Sección Panorámica con Accesos y Resumen */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {/* Tarjeta: Resumen de Catálogo y Acceso rápido */}
        <div className={styles.tablaCard}>
          <div className={styles.tablaHeader}>
            <div>
              <h3>Catálogo Reciente</h3>
              <p>Últimos artículos cargados en la base de datos</p>
            </div>
            <Link to="/admin/productos" className={styles.btnNuevo} style={{ textDecoration: "none" }}>
              <span>Ver todos</span>
              <FiArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.tablaWrapper}>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "1.5rem" }}>
                      Cargando resumen...
                    </td>
                  </tr>
                ) : ultimosProductos.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", padding: "1.5rem" }}>
                      No hay productos registrados
                    </td>
                  </tr>
                ) : (
                  ultimosProductos.map((prod) => (
                    <tr key={prod.id}>
                      <td className={styles.colProducto}>
                        <img
                          src={prod.imagen || "https://picsum.photos/400/400"}
                          alt={prod.nombre}
                          className={styles.prodImg}
                        />
                        <span className={styles.prodNombre}>{prod.nombre}</span>
                      </td>
                      <td>
                        <span className={styles.categoriaBadge}>{prod.categoria}</span>
                      </td>
                      <td>
                        <strong>${prod.precio?.toLocaleString("es-AR")}</strong>
                      </td>
                      <td>
                        <span className={styles.estadoActivo}>
                          {prod.stock > 0 ? `${prod.stock} u.` : "Agotado"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tarjeta: Alertas y Accesos Rápidos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Alertas de inventario */}
          <div className={styles.tablaCard} style={{ flex: 1 }}>
            <div className={styles.tablaHeader}>
              <div>
                <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <FiAlertTriangle color="var(--color-accent)" size={18} />
                  <span>Alertas de Stock</span>
                </h3>
                <p>Productos con stock bajo (3 o menos unidades)</p>
              </div>
            </div>

            {productosBajoStock.length === 0 ? (
              <p style={{ color: "var(--color-success)", fontSize: "0.9rem", fontWeight: 600 }}>
                ✅ Todos los productos cuentan con stock suficiente.
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {productosBajoStock.slice(0, 4).map((p) => (
                  <li
                    key={p.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.5rem 0.75rem",
                      backgroundColor: "var(--color-surface-subtle)",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.85rem",
                    }}
                  >
                    <span>{p.nombre}</span>
                    <strong style={{ color: "var(--color-accent)" }}>
                      {p.stock === 0 ? "Agotado" : `${p.stock} restantes`}
                    </strong>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Acceso Rápido */}
          <div className={styles.tablaCard} style={{ backgroundColor: "var(--color-primary)", color: "white" }}>
            <h3 style={{ color: "white", margin: "0 0 0.5rem" }}>¿Necesitas sumar productos?</h3>
            <p style={{ color: "rgba(255, 255, 255, 0.8)", fontSize: "0.85rem", margin: "0 0 1rem" }}>
              Ve a la sección de productos para dar de alta, editar precios o gestionar existencias con ImgBB.
            </p>
            <Link
              to="/admin/productos"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "white",
                color: "var(--color-primary)",
                padding: "0.55rem 1.1rem",
                borderRadius: "var(--radius-md)",
                fontWeight: 700,
                fontSize: "0.85rem",
                textDecoration: "none",
              }}
            >
              <FiPlus size={16} />
              <span>Ir a Gestión de Productos</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
