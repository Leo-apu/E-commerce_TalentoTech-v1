import { useCart } from "../../context/CartContext";
import { CartEmpty } from "./components/CartEmpty";
import { CartContent } from "./components/CartContent";

function CartPage() {
  const cartProps = useCart();

  if (cartProps.cartItems.length === 0) {
    return <CartEmpty />;
  }

  return <CartContent {...cartProps} />;
}

export default CartPage;
