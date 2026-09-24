import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext.jsx";
import Layout from "./layouts/Layout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import ItemListContainer from "./pages/ItemListContainer/ItemListContainer.jsx";
import ItemDetailContainer from "./pages/ItemDetailContainer/ItemDetailContainer.jsx";
import CartPage from "./pages/Cart/CartPage.jsx";
import Favoritos from "./pages/Favoritos/Favoritos.jsx";
import Login from "./pages/Login/Login.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import ProfilePage from "./pages/Profile/ProfilePage.jsx";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage.jsx";
import NotFoundPage from "./pages/NotFound/NotFoundPage.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 2500,
          style: {
            background: "#18181b",
            color: "#ffffff",
            fontSize: "0.88rem",
            fontWeight: 500,
            borderRadius: "10px",
            padding: "0.75rem 1.25rem",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#ffffff" },
          },
          error: {
            iconTheme: { primary: "#e63946", secondary: "#ffffff" },
          },
        }}
      />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ItemListContainer />} />
          <Route path="/categoria/:categoria" element={<ItemListContainer />} />
          <Route path="/producto/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<CartPage />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/productos" element={<AdminDashboardPage />} />
          <Route path="/admin/pedidos" element={<AdminDashboardPage />} />
          <Route path="/admin/clientes" element={<AdminDashboardPage />} />
        </Route>
      </Routes>
    </CartProvider>
  );
}

export default App;
