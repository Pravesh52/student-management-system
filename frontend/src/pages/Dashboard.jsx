import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, UserCheck, Users, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import StatsCard from "../components/dashboard/StatsCard";
import StudentCard from "../components/students/StudentCard";
import Loader from "../components/common/Loader";
import api, { getErrorMessage } from "../services/api";
import { studentService } from "../services/studentService";

export default function Dashboard() {
  const [stats,setStats] = useState({});
  const [recent,setRecent] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  useEffect(() => {
    Promise.allSettled([api.get("/dashboard/stats"),studentService.getAll({limit:5,sort:"-createdAt"})]).then(([a,b])=>{
      if(a.status==="fulfilled") setStats(a.value.data.stats || a.value.data.data || a.value.data);
      else setError(getErrorMessage(a.reason));
      if(b.status==="fulfilled") setRecent(b.value.students || b.value.data?.students || b.value.data || []);
    }).finally(()=>setLoading(false));
  },[]);
  if(loading) return <Loader text="Loading dashboard..."/>;
  const total = stats.totalStudents ?? stats.total ?? stats.studentCount ?? 0;
  const active = stats.activeStudents ?? stats.active ?? 0;
  const inactive = stats.inactiveStudents ?? stats.inactive ?? 0;
  const courses = stats.totalCourses ?? stats.courseCount ?? stats.courses ?? 0;
  return <div className="dashboard-content">{error && <div className="alert alert-warning">Dashboard summary could not be loaded: {error}</div>}<div className="welcome-banner"><div><span>OVERVIEW</span><h2>Welcome to CampusFlow 👋</h2><p>Here’s what’s happening with your institution today.</p></div><Link to="/students/add" className="btn btn-white">+ Add new student</Link></div><div className="stats-grid"><StatsCard title="Total students" value={total} note="Registered students" icon={Users} tone="blue"/><StatsCard title="Active students" value={active} note="Currently enrolled" icon={UserCheck} tone="green"/><StatsCard title="Inactive students" value={inactive} note="Not currently active" icon={GraduationCap} tone="orange"/><StatsCard title="Total courses" value={courses} note="Available courses" icon={BookOpen} tone="purple"/></div><section className="panel"><div className="panel-heading"><div><h3>Recently added students</h3><p>Your latest student registrations</p></div><Link to="/students" className="text-link">View all <ArrowUpRight size={16}/></Link></div>{recent.length ? <div className="recent-grid">{recent.slice(0,5).map(s=><StudentCard key={s._id || s.id} student={s}/>)}</div> : <div className="empty-state compact-empty"><h3>No recent students</h3><p>New student registrations will appear here.</p></div>}</section></div>;
}
