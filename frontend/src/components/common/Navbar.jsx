
import { Bell, Menu, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getInitials } from "../../utils/validators";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="topbar">
      <button
        className="icon-btn mobile-menu"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={21} />
      </button>

      <div className="top-search">
        <Search size={18} />
        <input placeholder="Search anything..." aria-label="Search" />
      </div>

      <div className="topbar-right">
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={19} />
          <i />
        </button>

        <div className="user-mini">
          <div className="avatar">
            {getInitials(user?.name || "Admin")}
          </div>
          <div>
            <strong>{user?.name || "Administrator"}</strong>
            <small>Administrator</small>
          </div>
        </div>

        <button
          className="icon-btn"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout"
        >
          <LogOut size={19} />
        </button>
      </div>
    </header>
  );
}
