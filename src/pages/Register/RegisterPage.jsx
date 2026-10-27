import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import RegisterForm from "../../components/Auth/RegisterForm/RegisterForm.jsx";
import { validateRegisterForm } from "../../utils/validateForm.js";
import {
  uploadImageToImgBB,
  validateImageFile,
} from "../../services/imgbbService.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./RegisterPage.module.css";

function RegisterPage() {
  const navigate = useNavigate();
  const { user, registerWithEmail, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [estadoSubida, setEstadoSubida] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/perfil");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: null, general: null }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      validateImageFile(file);
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));

      if (errors.avatar) {
        setErrors((prev) => ({ ...prev, avatar: null }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, avatar: err.message }));
      setAvatarFile(null);
      setAvatarPreview(null);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateRegisterForm({
      ...formData,
      avatarFile,
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      toast.error("Por favor completa los campos requeridos");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        formData.nombre.trim(),
      )}&background=0f172a&color=fff`;

      if (avatarFile) {
        setEstadoSubida("Subiendo foto a ImgBB...");
        const imgRes = await uploadImageToImgBB(avatarFile);
        avatarUrl = imgRes.url;
      }

      setEstadoSubida("Creando tu cuenta...");
      await registerWithEmail({
        nombre: formData.nombre,
        email: formData.email,
        password: formData.password,
        avatarUrl: avatarUrl,
      });

      toast.success(`¡Registro exitoso! Bienvenido, ${formData.nombre}`);
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      let mensajeError = "Error al completar el registro";
      if (err.code === "auth/email-already-in-use") {
        mensajeError = "Ya existe una cuenta registrada con este correo.";
      } else if (err.code === "auth/weak-password") {
        mensajeError = "La contraseña es muy débil (mínimo 6 caracteres).";
      }
      setErrors({ general: mensajeError });
      toast.error(mensajeError);
    } finally {
      setIsSubmitting(false);
      setEstadoSubida("");
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleSubmitting(true);
    try {
      await loginWithGoogle();
      toast.success("¡Cuenta creada/iniciada con Google!");
      navigate("/perfil");
    } catch (err) {
      console.error(err);
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Error al registrarse con Google");
      }
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logoBadge}>
            <FiUserPlus size={28} />
          </div>
          <h1 className={styles.titulo}>Crear una cuenta</h1>
          <p className={styles.subtitulo}>
            Regístrate para comprar y personalizar tu perfil
          </p>
        </div>

        <button
          type="button"
          className={styles.botonGoogle}
          onClick={handleGoogleSignup}
          disabled={isGoogleSubmitting || isSubmitting}
        >
          <FcGoogle size={20} />
          <span>
            {isGoogleSubmitting
              ? "Conectando con Google..."
              : "Registrarme con Google"}
          </span>
        </button>

        <div className={styles.divisor}>
          <span>o completa tus datos</span>
        </div>

        <RegisterForm
          values={formData}
          errors={errors}
          avatarPreview={avatarPreview}
          isSubmitting={isSubmitting}
          estadoSubida={estadoSubida}
          onChange={handleChange}
          onFileChange={handleFileChange}
          onRemoveAvatar={handleRemoveAvatar}
          onSubmit={handleSubmit}
        />

        <div className={styles.footerCard}>
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className={styles.loginLink}>
              Iniciar sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

