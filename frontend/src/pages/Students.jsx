import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, SlidersHorizontal, Download } from "lucide-react";
import StudentTable from "../components/students/StudentTable";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Loader from "../components/common/Loader";
import { studentService } from "../services/studentService";
import { getErrorMessage } from "../services/api";
import { getId } from "../utils/validators";

export default function Students() {
  const [students,setStudents] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");
  const [query,setQuery] = useState("");
  const [status,setStatus] = useState("all");
  const [selected,setSelected] = useState(null);
  const [deleting,setDeleting] = useState(false);
  const load = () => { setLoading(true); studentService.getAll().then(r=>setStudents(r.students || r.data?.students || r.data || [])).catch(e=>setError(getErrorMessage(e))).finally(()=>setLoading(false)); };
  useEffect(()=>{load();},[]);
  const filtered = useMemo(()=>students.filter(s=>{
    const text = `${s.name||""} ${s.email||""} ${s.enrollmentId||""}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status==="all" || String(s.status||"active").toLowerCase()===status);
  }),[students,query,status]);
  const remove = async () => { if(!selected)return; setDeleting(true); try { await studentService.remove(getId(selected)); setSelected(null); load(); } catch(e){setError(getErrorMessage(e));} finally{setDeleting(false);} };
  const exportCsv = () => {
    const rows = [["Name","Email","Enrollment ID","Course","Status"],...filtered.map(s=>[s.name,s.email,s.enrollmentId||"",s.course?.name||s.courseName||s.course||"",s.status||"active"])];
    const csv = rows.map(row=>row.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(",")).join("\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); const a=document.createElement("a"); a.href=url; a.download="students.csv"; a.click(); URL.revokeObjectURL(url);
  };
  return <section className="panel"><div className="panel-heading"><div><h3>All students <span className="count-chip">{students.length}</span></h3><p>Manage student records and enrollment details.</p></div><Link to="/students/add" className="btn btn-primary"><Plus size={17}/> Add student</Link></div>{error&&<div className="alert alert-error">{error}</div>}<div className="toolbar"><div className="search-field"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search by name, email or ID..."/></div><div className="toolbar-right"><div className="filter-field"><SlidersHorizontal size={16}/><select value={status} onChange={e=>setStatus(e.target.value)}><option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select></div><button className="btn btn-light" onClick={exportCsv}><Download size={16}/> Export</button></div></div>{loading?<Loader text="Loading students..."/>:<StudentTable students={filtered} onDelete={setSelected}/>}<ConfirmDialog open={Boolean(selected)} title="Delete student?" message={`Are you sure you want to delete ${selected?.name || "this student"}?`} onCancel={()=>setSelected(null)} onConfirm={remove} busy={deleting}/></section>;
}
