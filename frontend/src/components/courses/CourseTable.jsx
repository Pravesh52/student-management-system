import { Pencil, Trash2 } from "lucide-react";
export default function CourseTable({ courses, onEdit, onDelete }) {
  if (!courses.length) return <div className="empty-state"><div>▤</div><h3>No courses yet</h3><p>Add your first course to get started.</p></div>;
  return <div className="table-scroll"><table><thead><tr><th>COURSE</th><th>CODE</th><th>DURATION</th><th>STATUS</th><th className="align-right">ACTIONS</th></tr></thead><tbody>{courses.map(c => <tr key={c._id || c.id}><td><b>{c.name || c.title}</b><small className="cell-sub">{c.description}</small></td><td>{c.code || "—"}</td><td>{c.duration || "—"}</td><td><span className={`status ${String(c.status || "active").toLowerCase()}`}>{c.status || "Active"}</span></td><td><div className="row-actions"><button onClick={() => onEdit(c)} title="Edit"><Pencil size={17}/></button><button onClick={() => onDelete(c)} title="Delete"><Trash2 size={17}/></button></div></td></tr>)}</tbody></table></div>;
}
