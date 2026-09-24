import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FiPackage,
  FiUser,
  FiMapPin,
  FiSettings,
  FiEdit2,
  FiShoppingBag,
  FiCamera,
  FiLock,
  FiInfo,
} from "react-icons/fi";
import {
  getCurrentUser,
  updateCurrentUser,
} from "../../services/authService.js";
import {
  uploadImageToImgBB,
  validateImageFile,
} from "../../services/imgbbService.js";
import toast from "react-hot-toast";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [tabActiva, setTabActiva] = useState("datos");
  const [avatarSubiendo, setAvatarSubiendo] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user) {
      toast("Por favor inicia sesión para acceder a tu perfil", {
        icon: <FiLock size={18} />,
      });
      navigate("/login");
    } else {
      setUsuario(user);
    }
  }, [navigate]);

  if (!usuario) return null;

  const handleNoImplementado = () => {
    toast("Funcionalidad no implementada", { icon: <FiInfo size={18} /> });
  };

  const handleCambiarAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      setAvatarSubiendo(true);
      toast.loading("Subiendo foto a ImgBB...", { id: "avatar-upload" });

      const resImg = await uploadImageToImgBB(file);
      const userActualizado = updateCurrentUser({
        avatarUrl: resImg.url,
        avatar: resImg.url,
      });

      setUsuario(userActualizado);
      toast.success("¡Foto de perfil actualizada con éxito!", {
        id: "avatar-upload",
      });
    } catch (err) {
      toast.error(err.message || "Error al subir la imagen a ImgBB", {
        id: "avatar-upload",
      });
    } finally {
      setAvatarSubiendo(false);
      if (e?.target) e.target.value = "";
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.perfilHeader}>
        <label
          htmlFor="perfil-avatar-input"
          className={styles.avatarWrapper}
          title="Haz clic para cambiar tu foto de perfil"
          style={{ cursor: avatarSubiendo ? "wait" : "pointer" }}
        >
          {usuario.avatarUrl ? (
            <img
              src={usuario.avatarUrl}
              alt={usuario.nombre}
              className={styles.avatarGrande}
            />
          ) : (
            <div className={styles.avatarPlaceholder}>
              <FiUser size={40} />
            </div>
          )}

          {avatarSubiendo ? (
            <div className={styles.avatarSubiendoOverlay}>
              <div
                style={{
                  width: "18px",
                  height: "18px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              <span>Subiendo</span>
            </div>
          ) : (
            <>
              <div className={styles.avatarOverlay}>
                <FiCamera size={20} />
                <span>Cambiar</span>
              </div>
              <div className={styles.avatarCameraBadge}>
                <FiCamera size={13} />
              </div>
            </>
          )}

          <input
            id="perfil-avatar-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            disabled={avatarSubiendo}
            onChange={handleCambiarAvatar}
          />
        </label>

        <div className={styles.headerInfo}>
          <h1>{usuario.nombre}</h1>
          <p>{usuario.email}</p>
        </div>
      </div>

      <div className={styles.cuerpoLayout}>
        <aside className={styles.sidebarNav}>
          <button
            type="button"
            className={`${styles.tabBtn} ${tabActiva === "pedidos" ? styles.tabActivo : ""}`}
            onClick={() => setTabActiva("pedidos")}
          >
            <FiPackage size={18} />
            <span>Mis Pedidos</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${tabActiva === "datos" ? styles.tabActivo : ""}`}
            onClick={() => setTabActiva("datos")}
          >
            <FiUser size={18} />
            <span>Datos Personales</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${tabActiva === "direcciones" ? styles.tabActivo : ""}`}
            onClick={() => setTabActiva("direcciones")}
          >
            <FiMapPin size={18} />
            <span>Direcciones</span>
          </button>

          <button
            type="button"
            className={`${styles.tabBtn} ${tabActiva === "config" ? styles.tabActivo : ""}`}
            onClick={() => setTabActiva("config")}
          >
            <FiSettings size={18} />
            <span>Configuración</span>
          </button>
        </aside>

        <main className={styles.tabContenidoCard}>
          {tabActiva === "datos" && (
            <div>
              <div className={styles.tabHeader}>
                <h2 className={styles.tabTitulo}>Datos Personales</h2>
                <button
                  type="button"
                  className={styles.botonAccion}
                  onClick={handleNoImplementado}
                >
                  <FiEdit2 size={15} />
                  <span>Editar información</span>
                </button>
              </div>

              <div className={styles.datosGrid}>
                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>Nombre Completo</span>
                  <span className={styles.datoValor}>{usuario.nombre}</span>
                </div>

                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>Correo Electrónico</span>
                  <span className={styles.datoValor}>{usuario.email}</span>
                </div>

                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>Teléfono</span>
                  <span className={styles.datoValor}>
                    {usuario.telefono || "+54 11 9876-5432"}
                  </span>
                </div>

                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>DNI / Identificación</span>
                  <span className={styles.datoValor}>
                    {usuario.dni || "No registrado"}
                  </span>
                </div>

                <div className={styles.datoTile}>
                  <span className={styles.datoLabel}>Tipo de Cuenta</span>
                  <span className={styles.datoValor}>
                    {usuario.rol === "admin" ? "Administrador" : "Cliente"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {tabActiva === "direcciones" && (
            <div>
              <div className={styles.tabHeader}>
                <h2 className={styles.tabTitulo}>Mis Direcciones</h2>
                <button
                  type="button"
                  className={styles.botonAccion}
                  onClick={handleNoImplementado}
                >
                  <FiEdit2 size={15} />
                  <span>Modificar dirección</span>
                </button>
              </div>

              <div className={styles.direccionCard}>
                <h3 className={styles.direccionTitulo}>
                  Dirección de entrega predeterminada
                </h3>
                <p className={styles.direccionTexto}>
                  {usuario.direccion?.calle || "Av. Corrientes 4500"}
                </p>
                <p className={styles.direccionTexto}>
                  {usuario.direccion?.ciudad || "Buenos Aires"},{" "}
                  {usuario.direccion?.provincia || "CABA"}
                </p>
                <p className={styles.direccionTexto}>
                  Código Postal: {usuario.direccion?.codigoPostal || "C1195"}
                </p>
              </div>
            </div>
          )}

          {tabActiva === "config" && (
            <div>
              <div className={styles.tabHeader}>
                <h2 className={styles.tabTitulo}>Configuración de Cuenta</h2>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "3.5rem 1rem",
                  color: "var(--color-text-secondary)",
                }}
              >
                <FiSettings
                  size={44}
                  style={{ opacity: 0.35, marginBottom: "1rem" }}
                />
                <h3
                  style={{ margin: "0 0 0.5rem", color: "var(--color-text)" }}
                >
                  Sección en construcción
                </h3>
                <p style={{ margin: 0, fontSize: "0.95rem" }}>
                  Próximamente podrás gestionar tus notificaciones y
                  preferencias de seguridad desde aquí.
                </p>
              </div>
            </div>
          )}

          {tabActiva === "pedidos" && (
            <div>
              <div className={styles.tabHeader}>
                <h2 className={styles.tabTitulo}>Mis Pedidos</h2>
              </div>
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  color: "#64748b",
                }}
              >
                <FiPackage
                  size={48}
                  style={{ opacity: 0.4, marginBottom: "1rem" }}
                />
                <h3 style={{ margin: "0 0 0.5rem", color: "#1e293b" }}>
                  Aún no tienes pedidos registrados
                </h3>
                <p style={{ margin: "0 0 1.5rem", fontSize: "0.92rem" }}>
                  Cuando realices una compra, podrás realizar el seguimiento
                  aquí.
                </p>
                <Link
                  to="/productos"
                  className={styles.botonAccion}
                  style={{
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <FiShoppingBag size={17} />
                  <span>Explorar productos</span>
                </Link>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;
