import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiUserCheck } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";

import LoginForm from "../../components/Auth/LoginForm/LoginForm.jsx";
import { validateLoginForm } from "../../utils/validateForm.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loginWithEmail, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const destino = location.state?.from?.pathname || "/perfil";

  useEffect(() => {
    if (user) {
      navigate(destino, { replace: true });
    }
  }, [user, navigate, destino]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name] || errors.general) {
      setErrors((prev) => ({ ...prev, [name]: null, general: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateLoginForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await loginWithEmail(formData.email, formData.password);
      toast.success("¡Inicio de sesión exitoso!");
      navigate(destino, { replace: true });
    } catch (err) {
      console.error(err);
      let mensajeError = "Error al iniciar sesión. Verifica tus datos.";
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/invalid-credential"
      ) {
        mensajeError = "Correo o contraseña incorrectos.";
      } else if (err.code === "auth/too-many-requests") {
        mensajeError = "Demasiados intentos fallidos. Intenta más tarde.";
      }
      setErrors({ general: mensajeError });
      toast.error(mensajeError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleSubmitting(true);
    try {
      await loginWithGoogle();
      toast.success("¡Sesión iniciada con Google!");
      navigate(destino, { replace: true });
    } catch (err) {
      console.error(err);
      if (err.code !== "auth/popup-closed-by-user") {
        toast.error("Error al iniciar sesión con Google");
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
            <FiUserCheck size={28} />
          </div>
          <h1 className={styles.titulo}>Iniciar sesión</h1>
          <p className={styles.subtitulo}>
            Accede a tus compras, favoritos y pedidos
          </p>
        </div>

        <button
          type="button"
          className={styles.botonGoogle}
          onClick={handleGoogleLogin}
          disabled={isGoogleSubmitting || isSubmitting}
        >
          <FcGoogle size={20} />
          <span>
            {isGoogleSubmitting
              ? "Conectando con Google..."
              : "Continuar con Google"}
          </span>
        </button>

        <div className={styles.divisor}>
          <span>o ingresa con tu correo</span>
        </div>

        <LoginForm
          values={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />

        <div className={styles.footerCard}>
          <p>
            ¿No tienes una cuenta?{" "}
            <Link to="/registro" className={styles.registroLink}>
              Registrarme gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
