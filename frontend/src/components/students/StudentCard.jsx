import { Link } from "react-router-dom";
import { getId, getInitials } from "../../utils/validators";
export default function StudentCard({ student }) {
  const id = getId(student);
  return <Link className="student-card" to={`/students/${id}`}><div className="avatar large">{getInitials(student.name)}</div><div><b>{student.name}</b><span>{student.email}</span><small>{student.course?.name || student.course || "Course not assigned"}</small></div></Link>;
}
