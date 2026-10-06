import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import styles from "./CategoriasDestacadas.module.css";

const categorias = [
  {
    nombre: "Tecnología",
    slug: "tecnologia",
    descripcion: "Dispositivos y gadgets",
    imagen: "https://picsum.photos/seed/cat-tech/600/400",
  },
  {
    nombre: "Indumentaria",
    slug: "indumentaria",
    descripcion: "Prendas y calzado urbano",
    imagen: "https://picsum.photos/seed/cat-ropa/600/400",
  },
  {
    nombre: "Accesorios",
    slug: "accesorios",
    descripcion: "Complementos y detalles",
    imagen: "https://picsum.photos/seed/cat-acc/600/400",
  },
];

function CategoriasDestacadas() {
  return (
    <section className={styles.seccion}>
      <div className={styles.cabecera}>
        <div>
          <h2 className={styles.tituloSeccion}>Categorías Destacadas</h2>
          <p className={styles.subtituloSeccion}>
            Encuentra exactamente lo que necesitas
          </p>
        </div>
      </div>

      <div className={styles.contenedor}>
        {categorias.map((cat) => (
          <div key={cat.slug}>
            <Link to={`/categoria/${cat.slug}`} className={styles.card}>
              <img
                src={cat.imagen}
                alt={cat.nombre}
                className={styles.imagen}
                loading="lazy"
              />
              <div className={styles.overlay} />
              <div className={styles.info}>
                <span className={styles.descripcion}>{cat.descripcion}</span>
                <div className={styles.filaTitulo}>
                  <h3 className={styles.nombre}>{cat.nombre}</h3>
                  <span className={styles.flechaIcono}>
                    <FiArrowRight size={18} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoriasDestacadas;
