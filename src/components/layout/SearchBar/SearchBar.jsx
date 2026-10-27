import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import styles from "./SearchBar.module.css";

export function SearchBar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryParam = searchParams.get("q") || "";
  const [termino, setTermino] = useState(queryParam);

  useEffect(() => {
    setTermino(queryParam);
  }, [queryParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryLimpia = termino.trim();
    if (queryLimpia) {
      navigate(`/productos?q=${encodeURIComponent(queryLimpia)}`);
    } else {
      navigate("/productos");
    }
  };

  const handleLimpiar = () => {
    setTermino("");
    if (queryParam) {
      navigate("/productos");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm} role="search">
      <span className={styles.searchIcon} aria-hidden="true">
        <FiSearch size={16} />
      </span>
      <input
        type="search"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="Buscar productos..."
        className={styles.searchInput}
        aria-label="Buscar productos en la tienda"
      />
      {termino && (
        <button
          type="button"
          onClick={handleLimpiar}
          className={styles.btnClear}
          aria-label="Borrar búsqueda"
        >
          <FiX size={15} />
        </button>
      )}
    </form>
  );
}

export default SearchBar;
