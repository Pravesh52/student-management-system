import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const titles = {"/dashboard":"Dashboard","/students":"Students","/students/add":"Add student","/courses":"Courses"};
export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const title = location.pathname.includes("/students/") ? (location.pathname.endsWith("/edit") ? "Edit student" : "Student profile") : titles[location.pathname] || "Dashboard";
  return <div className="app-shell"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)}/><div className="main-area"><Navbar onMenuClick={() => setMenuOpen(true)}/><main className="page-content"><div className="page-heading"><div><p className="eyebrow">CAMPUSFLOW / MANAGEMENT</p><h1>{title}</h1></div></div><Outlet/></main><footer className="footer">© {new Date().getFullYear()} CampusFlow. Student Management System.</footer></div></div>;
}
