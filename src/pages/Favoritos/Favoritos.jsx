import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart, FiTrash2, FiShoppingBag, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import styles from "./Favoritos.module.css";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem("favorites")) || [];
      setFavoritos(guardados);
    } catch {
      setFavoritos([]);
    }
  }, []);

  const quitarFavorito = (producto) => {
    try {
      const nuevos = favoritos.filter((p) => p.id !== producto.id);
      setFavoritos(nuevos);
      localStorage.setItem("favorites", JSON.stringify(nuevos));
      window.dispatchEvent(new Event("storage"));
      toast(`${producto.nombre} quitado de favoritos`, {
        icon: <FiHeart size={18} />,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const moverAlCarrito = (producto) => {
    addToCart(producto, 1);
    toast.success(`${producto.nombre} agregado al carrito`);
    openCart();
  };

  if (favoritos.length === 0) {
    return (
      <div className={styles.vacioContainer}>
        <div className={styles.iconoVacioWrapper}>
          <FiHeart size={44} />
        </div>
        <h2 className={styles.vacioTitulo}>Aún no tienes favoritos</h2>
        <p className={styles.vacioTexto}>
          Guarda los productos que más te gusten haciendo clic en el corazón y
          encuéntralos fácilmente aquí.
        </p>
        <Link to="/productos" className={styles.botonExplorar}>
          <span>Explorar productos</span>
          <FiArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      <div className={styles.cabecera}>
        <div>
          <h1 className={styles.titulo}>Mis Favoritos</h1>
          <p className={styles.subtitulo}>
            {favoritos.length} artículos guardados
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {favoritos.map((producto) => (
          <div
            key={producto.id}
            className={styles.card}
          >
            <div className={styles.imagenWrapper}>
              <Link
                to={`/producto/${producto.id}`}
                state={{ from: "/favoritos" }}
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className={styles.imagen}
                />
              </Link>
              <button
                className={styles.quitarBtn}
                onClick={() => quitarFavorito(producto)}
                aria-label="Quitar de favoritos"
              >
                <FiTrash2 size={16} />
              </button>
            </div>

            <div className={styles.info}>
              <Link
                to={`/producto/${producto.id}`}
                state={{ from: "/favoritos" }}
                className={styles.nombreLink}
              >
                <h3 className={styles.nombre}>{producto.nombre}</h3>
              </Link>
              <p className={styles.precio}>
                ${producto.precio.toLocaleString("es-AR")}
              </p>

              <button
                className={styles.botonCarrito}
                onClick={() => moverAlCarrito(producto)}
              >
                <FiShoppingBag size={16} />
                <span>Agregar al carrito</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favoritos;
