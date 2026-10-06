import { useState } from "react";
import { FiInfo } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";
import {
  uploadImageToImgBB,
  validateImageFile,
} from "../../services/imgbbService.js";
import { ProfileHeader } from "./components/ProfileHeader.jsx";
import { ProfileSidebar } from "./components/ProfileSidebar.jsx";
import { ProfileDataTab } from "./components/ProfileDataTab.jsx";
import { ProfileAddressTab } from "./components/ProfileAddressTab.jsx";
import { ProfileOrdersTab } from "./components/ProfileOrdersTab.jsx";
import { ProfileConfigTab } from "./components/ProfileConfigTab.jsx";

import toast from "react-hot-toast";
import styles from "./ProfilePage.module.css";

function ProfilePage() {
  const { user: usuario, updateUserProfile } = useAuth();
  const [tabActiva, setTabActiva] = useState("datos");
  const [avatarSubiendo, setAvatarSubiendo] = useState(false);

  if (!usuario) return null;

  const handleNoImplementado = () => {
    toast("Funcionalidad en desarrollo", { icon: <FiInfo size={18} /> });
  };

  const handleCambiarAvatar = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      setAvatarSubiendo(true);
      toast.loading("Subiendo foto a ImgBB...", { id: "avatar-upload" });

      const resImg = await uploadImageToImgBB(file);
      await updateUserProfile({
        avatarUrl: resImg.url,
        avatar: resImg.url,
      });

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
      <ProfileHeader
        usuario={usuario}
        onCambiarAvatar={handleCambiarAvatar}
        avatarSubiendo={avatarSubiendo}
      />

      <div className={styles.cuerpoLayout}>
        <ProfileSidebar
          tabActiva={tabActiva}
          onSelectTab={setTabActiva}
        />

        <main className={styles.tabContenidoCard}>
          {tabActiva === "datos" && (
            <ProfileDataTab
              usuario={usuario}
              onEditar={handleNoImplementado}
            />
          )}

          {tabActiva === "direcciones" && (
            <ProfileAddressTab
              usuario={usuario}
              onEditar={handleNoImplementado}
            />
          )}

          {tabActiva === "pedidos" && <ProfileOrdersTab />}

          {tabActiva === "config" && <ProfileConfigTab />}
        </main>
      </div>
    </div>
  );
}

export default ProfilePage;

