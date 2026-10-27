import { FiUser, FiCamera } from "react-icons/fi";
import styles from "../ProfilePage.module.css";

export function ProfileHeader({
  usuario,
  onCambiarAvatar,
  avatarSubiendo = false,
}) {
  return (
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
            referrerPolicy="no-referrer"
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
          onChange={onCambiarAvatar}
        />
      </label>

      <div className={styles.headerInfo}>
        <h1>{usuario.nombre}</h1>
        <p>{usuario.email}</p>
      </div>
    </div>
  );
}
