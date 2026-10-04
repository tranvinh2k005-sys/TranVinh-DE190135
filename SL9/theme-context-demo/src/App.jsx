import { useState } from "react";
import Vd1 from "./components/vd1/Vd1";
import "./App.css";

export default function App() {
  const [activeExample, setActiveExample] = useState("vd1");

  return (
    <div className="app-container">
      {/* Thanh chuyển đổi giữa các ví dụ (vd1, vd2, ...) */}
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
          Ví dụ 2: (Chờ thêm)
        </button>
      </div>

      {/* Nội dung tương ứng của từng ví dụ */}
      {activeExample === "vd1" && <Vd1 />}

      {activeExample === "vd2" && (
        <div className="placeholder-vd2">
          <h3>Ví dụ 2</h3>
          <p>Thư mục <code>src/components/vd2/</code> đã sẵn sàng để bạn thêm nội dung cho Ví dụ 2.</p>
        </div>
      )}
    </div>
  );
}
