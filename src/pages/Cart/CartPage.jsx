import { useCart } from "../../context/CartContext";
import { CartEmpty } from "./CartEmpty";
import { CartContent } from "./CartContent";

function CartPage() {
  const cartProps = useCart();

  if (cartProps.cartItems.length === 0) {
    return <CartEmpty />;
  }

  return <CartContent {...cartProps} />;
}

export default CartPage;
