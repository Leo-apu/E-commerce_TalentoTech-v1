import { FiSearch } from "react-icons/fi";
import styles from "../AdminDashboardPage.module.css";

export function GestionProductosFiltros({
  filtroTexto,
  onFiltroTextoChange,
  filtroCategoria,
  onFiltroCategoriaChange,
  soloStockBajo,
  onSoloStockBajoChange,
}) {
  return (
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
          onChange={(e) => onFiltroTextoChange(e.target.value)}
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
        onChange={(e) => onFiltroCategoriaChange(e.target.value)}
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
          onChange={(e) => onSoloStockBajoChange(e.target.checked)}
          className={styles.checkboxInput}
        />
        <span>Solo bajo stock (&lt; 10 u.)</span>
      </label>
    </div>
  );
}
