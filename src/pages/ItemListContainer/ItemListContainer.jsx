import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FiAlertCircle, FiInbox } from "react-icons/fi";
import ItemList from "../../components/product/ItemList/ItemList.jsx";
import styles from "./ItemListContainer.module.css";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config.js";

function ItemListContainer() {
  const { categoria } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    const productosRef = collection(db, "productos");
    const consulta = categoria
      ? query(productosRef, where("categoria", "==", categoria.toLowerCase()))
      : productosRef;

    getDocs(consulta)
      .then((snapshot) => {
        const productosFirebase = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(productosFirebase);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al cargar productos desde Firebase:", err);
        setError(
          "No se pudieron obtener los productos desde la base de datos.",
        );
        setCargando(false);
      });
  }, [categoria]);

  if (cargando) {
    return (
      <div className={styles.loadingContenedor}>
        <div className={styles.spinner} />
        <p className={styles.mensajeCargando}>Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.estadoMensaje}>
        <div className={styles.iconoAlerta}>
          <FiAlertCircle size={40} />
        </div>
        <h3>No pudimos cargar los productos</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className={styles.botonReintentar}
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className={styles.estadoMensaje}>
        <div className={styles.iconoVacio}>
          <FiInbox size={44} />
        </div>
        <h3>No hay productos en esta categoría</h3>
        <p>Pronto añadiremos nuevos artículos a esta sección.</p>
        <Link to="/productos" className={styles.botonVolverInicio}>
          Ver todos los productos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      {categoria && (
        <div className={styles.cabeceraCategoria}>
          <h2 className={styles.tituloCategoria}>{categoria}</h2>
          <span className={styles.conteoCategoria}>
            {productos.length} productos disponibles
          </span>
        </div>
      )}
      <ItemList productos={productos} />
    </div>
  );
}

export default ItemListContainer;
