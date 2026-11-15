import { Link } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDate, getId, getInitials } from "../../utils/validators";
export default function StudentTable({ students, onDelete }) {
  if (!students.length) return <div className="empty-state"><div>◎</div><h3>No students found</h3><p>Try changing your search or add a new student.</p></div>;
  return <div className="table-scroll"><table><thead><tr><th>STUDENT</th><th>ENROLLMENT ID</th><th>COURSE</th><th>JOINED</th><th>STATUS</th><th className="align-right">ACTIONS</th></tr></thead><tbody>
    {students.map(s => <tr key={getId(s)}><td><div className="table-person"><div className="avatar">{getInitials(s.name)}</div><div><b>{s.name}</b><small>{s.email}</small></div></div></td><td>{s.enrollmentId || s.studentId || "—"}</td><td>{s.course?.name || s.courseName || s.course || "—"}</td><td>{formatDate(s.createdAt || s.admissionDate)}</td><td><span className={`status ${String(s.status || "active").toLowerCase()}`}>{s.status || "Active"}</span></td><td><div className="row-actions"><Link title="View" to={`/students/${getId(s)}`}><Eye size={17}/></Link><Link title="Edit" to={`/students/${getId(s)}/edit`}><Pencil size={17}/></Link><button title="Delete" onClick={() => onDelete(s)}><Trash2 size={17}/></button></div></td></tr>)}
  </tbody></table></div>;
}
