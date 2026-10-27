import Banner from "../../components/home/Banner/Banner.jsx";
import BeneficiosBar from "../../components/home/BeneficiosBar/BeneficiosBar.jsx";
import CategoriasDestacadas from "../../components/home/CategoriasDestacadas/CategoriasDestacadas.jsx";
import ItemListContainer from "../ItemListContainer/ItemListContainer.jsx";

function HomePage() {
  return (
    <>
      <Banner />
      <BeneficiosBar />
      <CategoriasDestacadas />
      <ItemListContainer />
    </>
  );
}

export default HomePage;
