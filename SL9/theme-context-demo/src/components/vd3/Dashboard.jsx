import { useAuth } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="dashboard-box">
      <h2>Xin chào, {user?.username} 👋</h2>
      <p>Vai trò (Role): <b>{user?.role}</b></p>
      <p style={{ color: "#28a745" }}>
        ✅ Bạn đã đăng nhập thành công vào trang được bảo vệ bởi <code>ProtectedRoute</code>!
      </p>
      <button onClick={logout} className="logout-btn">
        Đăng xuất
      </button>
    </div>
  );
}
