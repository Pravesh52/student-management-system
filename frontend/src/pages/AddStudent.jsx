import { Link } from "react-router-dom";
import StudentForm from "../components/students/StudentForm";
export default function AddStudent() {
  const editing = window.location.pathname.endsWith("/edit");
  return <div><div className="back-row"><Link to="/students">← Back to students</Link></div><section className="panel"><div className="panel-heading"><div><h3>{editing?"Update student details":"Student information"}</h3><p>{editing?"Edit the student's record below.":"Fill in the details to register a new student."}</p></div></div><StudentForm/></section></div>;
}
