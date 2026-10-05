import { useCart, useCartDispatch } from "../../contexts/CartContext";

export default function Cart() {
  const { items } = useCart();
  const dispatch = useCartDispatch();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  if (items.length === 0) return <p className="empty-cart">Giỏ hàng trống.</p>;

  return (
    <div className="cart-section">
      <h3>Giỏ hàng</h3>
      <div className="cart-items">
        {items.map((i) => (
          <div key={i.id} className="cart-item">
            <span>
              {i.name} x {i.qty}
            </span>{" "}
            <div className="cart-item-actions">
              <button onClick={() => dispatch({ type: "ADD", payload: i })}>+</button>
              <button onClick={() => dispatch({ type: "DECREASE", payload: i.id })}>-</button>
              <button onClick={() => dispatch({ type: "REMOVE", payload: i.id })}>Xoá</button>
            </div>
          </div>
        ))}
      </div>
      <p className="cart-total">
        <b>Tổng: {total.toLocaleString("vi-VN")}đ</b>
      </p>
      <button className="clear-btn" onClick={() => dispatch({ type: "CLEAR" })}>
        Xoá hết
      </button>
    </div>
  );
}
