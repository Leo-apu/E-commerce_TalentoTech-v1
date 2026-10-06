import { useState, useEffect } from "react";
import {
  FiPlus,
  FiTrash2,
  FiEdit3,
  FiSearch,
  FiInbox,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import FormularioProductoModal from "./FormularioProductoModal";
import Pagination from "../../components/Pagination/Pagination";
import toast from "react-hot-toast";
import styles from "./AdminDashboardPage.module.css";

const ITEMS_POR_PAGINA = 8;

export function GestionProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("todas");
  const [soloStockBajo, setSoloStockBajo] = useState(false);
  const [paginaActual, setPaginaActual] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);

  const cargarProductos = async () => {
    setCargando(true);
    try {
      const snapshot = await getDocs(collection(db, "productos"));
      if (snapshot.empty) {
        setProductos([]);
      } else {
        const docs = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setProductos(docs);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
      toast.error("Error al cargar productos desde Firestore");
      setProductos([]);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  useEffect(() => {
    setPaginaActual(0);
  }, [filtroTexto, filtroCategoria, soloStockBajo]);

  const handleAbrirNuevo = () => {
    setProductoAEditar(null);
    setIsModalOpen(true);
  };

  const handleAbrirEditar = (producto) => {
    setProductoAEditar(producto);
    setIsModalOpen(true);
  };

  const handleCerrarModal = () => {
    setIsModalOpen(false);
    setProductoAEditar(null);
  };

  const handleEliminarProducto = async (id, nombre) => {
    const confirmar = window.confirm(
      `¿Seguro quieres eliminar el producto "${nombre}"?`,
    );
    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "productos", id));
      setProductos((prev) => prev.filter((p) => p.id !== id));
      toast.success(`Producto "${nombre}" eliminado correctamente`);
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      toast.error("Error al eliminar el producto");
    }
  };

  const handleProductoCreado = (nuevoProducto) => {
    setProductos((prev) => [nuevoProducto, ...prev]);
  };

  const handleProductoEditado = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === productoActualizado.id ? productoActualizado : p,
      ),
    );
  };

  const renderStockBadge = (stock) => {
    const cantidad = Number(stock) ?? 0;
    if (cantidad <= 0) {
      return (
        <span className={styles.badgeStockAgotado}>
          <FiXCircle size={13} />
          <span>Sin stock</span>
        </span>
      );
    }
    if (cantidad < 10) {
      return (
        <span className={styles.badgeStockBajo}>
          <FiAlertTriangle size={13} />
          <span>{cantidad} u. (Bajo)</span>
        </span>
      );
    }
    return (
      <span className={styles.badgeStockOk}>
        <FiCheckCircle size={13} />
        <span>{cantidad} u.</span>
      </span>
    );
  };

  const productosFiltrados = productos.filter((p) => {
    const coincideNombre = p.nombre
      ?.toLowerCase()
      .includes(filtroTexto.toLowerCase());
    const coincideCategoria =
      filtroCategoria === "todas" ||
      p.categoria?.toLowerCase() === filtroCategoria.toLowerCase();
    const coincideStockBajo = soloStockBajo
      ? (Number(p.stock) || 0) < 10
      : true;

    return coincideNombre && coincideCategoria && coincideStockBajo;
  });

  const totalPaginas = Math.ceil(productosFiltrados.length / ITEMS_POR_PAGINA);
  const inicio = paginaActual * ITEMS_POR_PAGINA;
  const productosPaginados = productosFiltrados.slice(
    inicio,
    inicio + ITEMS_POR_PAGINA,
  );

  return (
    <div className={styles.tablaCard}>
      <div className={styles.tablaHeader}>
        <div>
          <h3>Gestión de Catálogo</h3>
          <p>{productos.length} productos registrados en Firestore</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            className={styles.btnEditar}
            onClick={cargarProductos}
            title="Recargar catálogo"
            aria-label="Recargar catálogo"
          >
            <FiRefreshCw size={15} className={cargando ? "spin" : ""} />
          </button>
          <button className={styles.btnNuevo} onClick={handleAbrirNuevo}>
            <FiPlus size={16} />
            <span>Nuevo Producto</span>
          </button>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.25rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: "220px" }}>
          <FiSearch
            size={16}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-tertiary)",
            }}
          />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={filtroTexto}
            onChange={(e) => setFiltroTexto(e.target.value)}
            style={{
              width: "100%",
              padding: "0.55rem 0.75rem 0.55rem 2.25rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.88rem",
            }}
          />
        </div>

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          style={{
            padding: "0.55rem 1rem",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-border)",
            fontFamily: "var(--font-sans)",
            fontSize: "0.88rem",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <option value="todas">Todas las categorías</option>
          <option value="tecnologia">Tecnología</option>
          <option value="indumentaria">Indumentaria</option>
          <option value="accesorios">Accesorios</option>
        </select>

        <label className={styles.filtroCheckLabel}>
          <input
            type="checkbox"
            checked={soloStockBajo}
            onChange={(e) => setSoloStockBajo(e.target.checked)}
            className={styles.checkboxInput}
          />
          <span>Solo bajo stock (&lt; 10 u.)</span>
        </label>
      </div>

      <div className={styles.tablaWrapper}>
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cargando ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  Cargando catálogo desde Firebase...
                </td>
              </tr>
            ) : productosPaginados.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "2.5rem 1rem" }}
                >
                  <FiInbox size={36} color="var(--color-text-tertiary)" />
                  <p
                    style={{
                      margin: "0.5rem 0 0",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    No se encontraron productos coincidentes
                  </p>
                </td>
              </tr>
            ) : (
              productosPaginados.map((prod) => (
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
                    <span className={styles.categoriaBadge}>
                      {prod.categoria}
                    </span>
                  </td>
                  <td>
                    <strong>${prod.precio?.toLocaleString("es-AR")}</strong>
                  </td>
                  <td>{renderStockBadge(prod.stock)}</td>
                  <td>
                    <button
                      className={styles.btnEditar}
                      onClick={() => handleAbrirEditar(prod)}
                    >
                      <FiEdit3 size={14} style={{ marginRight: "0.3rem" }} />
                      Editar
                    </button>
                    <button
                      className={styles.btnEliminar}
                      onClick={() =>
                        handleEliminarProducto(prod.id, prod.nombre)
                      }
                      aria-label="Eliminar producto"
                      style={{ marginLeft: "0.4rem" }}
                    >
                      <FiTrash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación Reutilizable */}
      <Pagination
        pageCount={totalPaginas}
        currentPage={paginaActual}
        onPageChange={setPaginaActual}
      />

      {isModalOpen && (
        <FormularioProductoModal
          onCerrar={handleCerrarModal}
          onProductoCreado={handleProductoCreado}
          productoAEditar={productoAEditar}
          onProductoEditado={handleProductoEditado}
        />
      )}
    </div>
  );
}

export default GestionProductos;
