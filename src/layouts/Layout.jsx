import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header.jsx";
import Navbar from "../components/layout/Navbar/Navbar.jsx";
import Footer from "../components/layout/Footer/Footer.jsx";
import CartDrawer from "../components/layout/CartDrawer/CartDrawer.jsx";

function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <Navbar />
      <CartDrawer />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
