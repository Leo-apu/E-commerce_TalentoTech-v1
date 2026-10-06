import { createContext, useContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db, googleProvider } from "../firebase/config";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const firestoreData = userDocSnap.data();
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              nombre:
                firestoreData.nombre || firebaseUser.displayName || "Usuario",
              rol: firestoreData.rol || "cliente",
              telefono: firestoreData.telefono || "",
              dni: firestoreData.dni || "",
              direccion: firestoreData.direccion || {
                calle: "",
                ciudad: "",
                provincia: "",
                codigoPostal: "",
              },
              avatarUrl:
                firestoreData.avatar ||
                firestoreData.avatarUrl ||
                firebaseUser.photoURL ||
                "",
              ...firestoreData,
            });
          } else {
            const nuevoUsuario = {
              nombre: firebaseUser.displayName || "Usuario",
              email: firebaseUser.email,
              rol: "cliente",
              telefono: "",
              dni: "",
              direccion: {
                calle: "",
                ciudad: "",
                provincia: "",
                codigoPostal: "",
              },
              avatar: firebaseUser.photoURL || "",
              avatarUrl: firebaseUser.photoURL || "",
              createdAt: serverTimestamp(),
            };

            await setDoc(userDocRef, nuevoUsuario);
            setUser({
              uid: firebaseUser.uid,
              ...nuevoUsuario,
            });
          }
        } catch (error) {
          console.error(
            "Error al obtener datos del usuario en Firestore:",
            error,
          );
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            nombre: firebaseUser.displayName || "Usuario",
            rol: "cliente",
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = async ({
    nombre,
    email,
    password,
    telefono = "",
    dni = "",
    direccion = { calle: "", ciudad: "", provincia: "", codigoPostal: "" },
    avatarUrl = "",
  }) => {
    const credencial = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const nuevoUser = credencial.user;

    const datosFirestore = {
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      rol: "cliente",
      telefono: telefono || "",
      dni: dni || "",
      direccion: direccion || {
        calle: "",
        ciudad: "",
        provincia: "",
        codigoPostal: "",
      },
      avatar: avatarUrl || "",
      avatarUrl: avatarUrl || "",
      createdAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", nuevoUser.uid), datosFirestore);
    return nuevoUser;
  };

  const loginWithGoogle = async () => {
    const credencial = await signInWithPopup(auth, googleProvider);
    const googleUser = credencial.user;

    const userDocRef = doc(db, "users", googleUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      const datosFirestore = {
        nombre: googleUser.displayName || "Usuario",
        email: googleUser.email,
        rol: "cliente",
        telefono: "",
        dni: "",
        direccion: {
          calle: "",
          ciudad: "",
          provincia: "",
          codigoPostal: "",
        },
        avatar: googleUser.photoURL || "",
        avatarUrl: googleUser.photoURL || "",
        createdAt: serverTimestamp(),
      };
      await setDoc(userDocRef, datosFirestore);
    }
    return googleUser;
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const updateUserProfile = async (nuevosDatos) => {
    if (!user?.uid) throw new Error("No hay usuario autenticado");

    const userDocRef = doc(db, "users", user.uid);
    await updateDoc(userDocRef, nuevosDatos);

    setUser((prev) => ({
      ...prev,
      ...nuevosDatos,
    }));
  };

  const value = {
    user,
    loading,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
