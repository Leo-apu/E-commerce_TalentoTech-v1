import ReactPaginate from "react-paginate";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import styles from "./Pagination.module.css";

export function Pagination({
  pageCount,
  currentPage = 0,
  onPageChange,
  marginPagesDisplayed = 1,
  pageRangeDisplayed = 3,
  className = "",
}) {
  if (pageCount <= 1) return null;

  return (
    <div className={className}>
      <ReactPaginate
        previousLabel={<FiChevronLeft size={18} />}
        nextLabel={<FiChevronRight size={18} />}
        pageCount={pageCount}
        forcePage={currentPage}
        onPageChange={({ selected }) => onPageChange(selected)}
        marginPagesDisplayed={marginPagesDisplayed}
        pageRangeDisplayed={pageRangeDisplayed}
        containerClassName={styles.paginacion}
        pageClassName={styles.pagina}
        pageLinkClassName={styles.paginaLink}
        activeClassName={styles.paginaActiva}
        previousClassName={styles.pagina}
        nextClassName={styles.pagina}
        previousLinkClassName={`${styles.paginaLink} ${styles.paginaNav}`}
        nextLinkClassName={`${styles.paginaLink} ${styles.paginaNav}`}
        disabledClassName={styles.paginaDeshabilitada}
        breakClassName={styles.pagina}
        breakLinkClassName={styles.paginaLink}
      />
    </div>
  );
}

export default Pagination;
