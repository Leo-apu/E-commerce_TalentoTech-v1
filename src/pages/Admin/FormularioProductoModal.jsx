import { useState, useRef } from "react";
import { FiX, FiUploadCloud, FiTrash2, FiPlusCircle, FiEdit3, FiLoader } from "react-icons/fi";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { uploadImageToImgBB } from "../../services/imgbbService";
import { validateProductForm } from "../../utils/validateForm";
import toast from "react-hot-toast";
import styles from "./FormularioProductoModal.module.css";

function FormularioProductoModal({ onCerrar, onProductoCreado, productoAEditar, onProductoEditado }) {
  const esModoEdicion = Boolean(productoAEditar);

  const [formData, setFormData] = useState({
    nombre: productoAEditar?.nombre || "",
    precio: productoAEditar?.precio !== undefined ? productoAEditar.precio : "",
    stock: productoAEditar?.stock !== undefined ? productoAEditar.stock : 10,
    categoria: productoAEditar?.categoria || "tecnologia",
    descripcion: productoAEditar?.descripcion || "",
    imagenFile: null,
    imagenUrl: productoAEditar?.imagen || "",
  });

  const [previewUrl, setPreviewUrl] = useState(productoAEditar?.imagen || "");
  const [errores, setErrores] = useState({});
  const [subiendo, setSubiendo] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("El archivo debe ser una imagen (JPG, PNG o WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen no debe superar los 5MB");
      return;
    }

    setFormData((prev) => ({ ...prev, imagenFile: file, imagenUrl: "" }));
    setPreviewUrl(URL.createObjectURL(file));

    if (errores.imagen) {
      setErrores((prev) => ({ ...prev, imagen: null }));
    }
  };

  const handleQuitarFoto = () => {
    setFormData((prev) => ({ ...prev, imagenFile: null, imagenUrl: "" }));
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const erroresValidacion = validateProductForm(formData);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      toast.error("Por favor revisa los campos con error");
      return;
    }

    setSubiendo(true);
    const mensajeCarga = esModoEdicion
      ? "Actualizando datos del producto..."
      : "Subiendo imagen y registrando producto...";
    const toastId = toast.loading(mensajeCarga);

    try {
      let finalImageUrl = formData.imagenUrl;

      // Si seleccionó una nueva foto, la subimos a ImgBB
      if (formData.imagenFile) {
        const resImgbb = await uploadImageToImgBB(formData.imagenFile);
        finalImageUrl = resImgbb.url;
      }

      if (!finalImageUrl) {
        finalImageUrl = "https://picsum.photos/seed/default/400/400";
      }

      const datosProducto = {
        nombre: formData.nombre.trim(),
        precio: Number(formData.precio),
        stock: Number(formData.stock),
        categoria: formData.categoria.toLowerCase(),
        descripcion: formData.descripcion.trim(),
        imagen: finalImageUrl,
      };

      if (esModoEdicion) {
        // Modo Edición: Actualizar con updateDoc
        const docRef = doc(db, "productos", productoAEditar.id);
        const datosActualizados = {
          ...datosProducto,
          updatedAt: new Date().toISOString(),
        };

        await updateDoc(docRef, datosActualizados);
        onProductoEditado({ id: productoAEditar.id, ...datosActualizados });
        toast.success(`¡"${datosProducto.nombre}" actualizado correctamente!`, { id: toastId });
      } else {
        // Modo Creación: Guardar nuevo con addDoc
        const nuevoConFecha = {
          ...datosProducto,
          createdAt: new Date().toISOString(),
        };

        const docRef = await addDoc(collection(db, "productos"), nuevoConFecha);
        onProductoCreado({ id: docRef.id, ...nuevoConFecha });
        toast.success(`¡"${datosProducto.nombre}" agregado con éxito!`, { id: toastId });
      }

      onCerrar();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      toast.error(error.message || "No se pudo guardar el producto", { id: toastId });
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onCerrar}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            {esModoEdicion ? (
              <FiEdit3 size={20} color="var(--color-primary)" />
            ) : (
              <FiPlusCircle size={20} color="var(--color-primary)" />
            )}
            <h3>{esModoEdicion ? "Editar Producto" : "Nuevo Producto"}</h3>
          </div>
          <button className={styles.btnCerrar} onClick={onCerrar} aria-label="Cerrar modal">
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Nombre */}
          <div className={styles.campo}>
            <label className={styles.label}>Nombre del Producto *</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Teclado Mecánico RGB"
              className={`${styles.input} ${errores.nombre ? styles.inputError : ""}`}
            />
            {errores.nombre && <span className={styles.errorMsg}>{errores.nombre}</span>}
          </div>

          {/* Precio y Stock */}
          <div className={styles.filaDoble}>
            <div className={styles.campo}>
              <label className={styles.label}>Precio ($ ARS) *</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="Ej: 45000"
                min="0"
                className={`${styles.input} ${errores.precio ? styles.inputError : ""}`}
              />
              {errores.precio && <span className={styles.errorMsg}>{errores.precio}</span>}
            </div>

            <div className={styles.campo}>
              <label className={styles.label}>Stock Disponible *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Ej: 15"
                min="0"
                className={`${styles.input} ${errores.stock ? styles.inputError : ""}`}
              />
              {errores.stock && <span className={styles.errorMsg}>{errores.stock}</span>}
            </div>
          </div>

          {/* Categoría */}
          <div className={styles.campo}>
            <label className={styles.label}>Categoría *</label>
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className={`${styles.select} ${errores.categoria ? styles.inputError : ""}`}
            >
              <option value="tecnologia">Tecnología</option>
              <option value="indumentaria">Indumentaria</option>
              <option value="accesorios">Accesorios</option>
            </select>
            {errores.categoria && <span className={styles.errorMsg}>{errores.categoria}</span>}
          </div>

          {/* Descripción */}
          <div className={styles.campo}>
            <label className={styles.label}>Descripción *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Escribe los detalles o especificaciones del producto..."
              className={`${styles.textarea} ${errores.descripcion ? styles.inputError : ""}`}
            />
            {errores.descripcion && <span className={styles.errorMsg}>{errores.descripcion}</span>}
          </div>

          {/* Imagen (ImgBB o URL) */}
          <div className={styles.campo}>
            <label className={styles.label}>Imagen del Producto (ImgBB) *</label>
            {previewUrl ? (
              <div className={styles.previewContainer}>
                <img src={previewUrl} alt="Vista previa" className={styles.previewImg} />
                <button
                  type="button"
                  onClick={handleQuitarFoto}
                  className={styles.btnQuitarFoto}
                  aria-label="Quitar foto"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ) : (
              <div
                className={`${styles.uploadBox} ${errores.imagen ? styles.inputError : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                <FiUploadCloud size={32} color="var(--color-text-secondary)" />
                <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  Haz clic para subir una foto
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>
                  JPG, PNG o WebP hasta 5MB (Se alojará en ImgBB)
                </span>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            {errores.imagen && <span className={styles.errorMsg}>{errores.imagen}</span>}
          </div>

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.btnCancelar}
              onClick={onCerrar}
              disabled={subiendo}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.btnGuardar}
              disabled={subiendo}
            >
              {subiendo ? (
                <>
                  <FiLoader size={16} className="spin" />
                  <span>{esModoEdicion ? "Guardando..." : "Creando..."}</span>
                </>
              ) : (
                <span>{esModoEdicion ? "Guardar Cambios" : "Publicar Producto"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioProductoModal;
