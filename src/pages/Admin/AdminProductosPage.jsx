import { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { GestionProductosHeader } from "./components/GestionProductosHeader";
import { GestionProductosFiltros } from "./components/GestionProductosFiltros";
import { GestionProductosTabla } from "./components/GestionProductosTabla";
import FormularioProductoModal from "./components/FormularioProductoModal";
import Pagination from "../../components/common/Pagination/Pagination";
import toast from "react-hot-toast";
import styles from "./AdminDashboardPage.module.css";

const ITEMS_POR_PAGINA = 8;

export function AdminProductosPage() {
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
      <GestionProductosHeader
        totalProductos={productos.length}
        cargando={cargando}
        onRecargar={cargarProductos}
        onNuevoProducto={handleAbrirNuevo}
      />

      <GestionProductosFiltros
        filtroTexto={filtroTexto}
        onFiltroTextoChange={setFiltroTexto}
        filtroCategoria={filtroCategoria}
        onFiltroCategoriaChange={setFiltroCategoria}
        soloStockBajo={soloStockBajo}
        onSoloStockBajoChange={setSoloStockBajo}
      />

      <GestionProductosTabla
        productos={productosPaginados}
        cargando={cargando}
        onEditar={handleAbrirEditar}
        onEliminar={handleEliminarProducto}
      />

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

export default AdminProductosPage;

