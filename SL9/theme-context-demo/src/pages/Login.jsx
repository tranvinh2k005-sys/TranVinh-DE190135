import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(form.username, form.password)) {
      navigate("/dashboard");
    } else {
      setError("Sai tài khoản hoặc mật khẩu (Thử: admin / 123)");
    }
  };

  return (
    <div className="login-box">
      <h3>Trang Đăng Nhập</h3>
      <p style={{ fontSize: "14px", color: "#666" }}>
        Tài khoản mẫu: <code>admin</code> / Mật khẩu: <code>123</code>
      </p>
      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <input
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>
        <button type="submit">Đăng nhập</button>
        {error && <p className="error-text">{error}</p>}
      </form>
    </div>
  );
}
