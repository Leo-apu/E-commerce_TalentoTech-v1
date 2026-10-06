import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Item from "../Item/Item.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import styles from "./ItemList.module.css";

const PRODUCTOS_POR_PAGINA = 12;

function ItemList({ productos }) {
  const location = useLocation();
  const paginaInicial = location.state?.pagina ?? 0;
  const [paginaActual, setPaginaActual] = useState(paginaInicial);

  useEffect(() => {
    if (location.state?.pagina !== undefined) {
      setPaginaActual(location.state.pagina);
    } else {
      setPaginaActual(0);
    }
  }, [productos, location.state]);

  const inicio = paginaActual * PRODUCTOS_POR_PAGINA;
  const productosPagina = productos.slice(
    inicio,
    inicio + PRODUCTOS_POR_PAGINA,
  );
  const totalPaginas = Math.ceil(productos.length / PRODUCTOS_POR_PAGINA);

  const handlePageChange = (paginaSeleccionada) => {
    setPaginaActual(paginaSeleccionada);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className={styles.grid}>
        {productosPagina.map((producto) => (
          <Item
            key={producto.id}
            producto={producto}
            paginaActual={paginaActual}
          />
        ))}
      </div>

      <Pagination
        pageCount={totalPaginas}
        currentPage={paginaActual}
        onPageChange={handlePageChange}
        pageRangeDisplayed={4}
      />
    </div>
  );
}

export default ItemList;
