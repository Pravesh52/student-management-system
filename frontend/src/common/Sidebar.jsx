import { NavLink } from "react-router-dom";
import { BookOpen, GraduationCap, LayoutDashboard, Users, X } from "lucide-react";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/students", label: "Students", icon: Users },
  { to: "/courses", label: "Courses", icon: BookOpen },
];

export default function Sidebar({ open, onClose }) {
  return <>
    {open && <button className="sidebar-scrim" onClick={onClose} aria-label="Close menu"/>}
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand"><div className="brand-mark"><GraduationCap size={24}/></div><div><b>Campus<span>Flow</span></b><small>STUDENT MANAGEMENT</small></div><button className="icon-btn sidebar-close" onClick={onClose}><X/></button></div>
      <div className="nav-caption">WORKSPACE</div>
      <nav>{links.map(({to,label,icon:Icon}) => <NavLink key={to} to={to} onClick={onClose} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}><Icon size={19}/><span>{label}</span></NavLink>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-bubble">?</div><b>Need some help?</b><p>Reach out to our support team.</p><a href="mailto:support@example.com">Contact support</a></div><small className="version">CampusFlow · v1.0.0</small></div>
    </aside>
  </>;
}
