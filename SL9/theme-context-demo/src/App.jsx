import { useState } from "react";
import Vd1 from "./components/vd1/Vd1";
import Vd2 from "./components/vd2/Vd2";
import Vd3 from "./components/vd3/Vd3";
import "./App.css";

export default function App() {
  const [activeExample, setActiveExample] = useState("vd2"); // Mặc định mở Ví dụ 2

  return (
    <div className="app-container">
      <h1 className="main-title">FER202 - Context API Demo</h1>
      
      {/* Thanh chuyển đổi tab giữa các ví dụ */}
      <div className="nav-tabs">
        <button
          className={activeExample === "vd1" ? "active" : ""}
          onClick={() => setActiveExample("vd1")}
        >
          Ví dụ 1: Theme Context
        </button>
        <button
          className={activeExample === "vd2" ? "active" : ""}
          onClick={() => setActiveExample("vd2")}
        >
          Ví dụ 2: Giỏ hàng (useReducer)
        </button>
        <button
          className={activeExample === "vd3" ? "active" : ""}
          onClick={() => setActiveExample("vd3")}
        >
          Ví dụ 3: Auth & ProtectedRoute
        </button>
      </div>

      {/* Nội dung tương ứng của ví dụ được chọn */}
      <div className="example-content">
        {activeExample === "vd1" && <Vd1 />}
        {activeExample === "vd2" && <Vd2 />}
        {activeExample === "vd3" && <Vd3 />}
      </div>
    </div>
  );
}
