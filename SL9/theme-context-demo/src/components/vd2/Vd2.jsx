import CartBadge from "./CartBadge";
import ProductList from "./ProductList";
import Cart from "./Cart";

export default function Vd2() {
  return (
    <div className="vd2-container">
      <header className="cart-header">
        <h2>Mini Shop Demo</h2>
        <CartBadge />
      </header>
      <ProductList />
      <hr />
      <Cart />
    </div>
  );
}
