import { products } from "../../data/products";
import { useCartDispatch } from "../../contexts/CartContext";

export default function ProductList() {
  const dispatch = useCartDispatch(); // không re-render khi cart đổi

  return (
    <div className="product-list-section">
      <h3>Sản phẩm</h3>
      <div className="product-items">
        {products.map((p) => (
          <div key={p.id} className="product-item">
            <span>
              {p.name} — {p.price.toLocaleString("vi-VN")}đ
            </span>{" "}
            <button onClick={() => dispatch({ type: "ADD", payload: p })}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
