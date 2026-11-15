import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Mail, Phone, MapPin, CalendarDays, Pencil } from "lucide-react";
import Loader from "../components/common/Loader";
import { studentService } from "../services/studentService";
import { getErrorMessage } from "../services/api";
import { formatDate, getInitials } from "../utils/validators";
export default function StudentProfile() {
  const {id}=useParams(); const [student,setStudent]=useState(null); const [loading,setLoading]=useState(true); const [error,setError]=useState("");
  useEffect(()=>{studentService.getById(id).then(r=>setStudent(r.student||r.data?.student||r.data||r)).catch(e=>setError(getErrorMessage(e))).finally(()=>setLoading(false));},[id]);
  if(loading)return <Loader text="Loading profile..."/>;
  if(error||!student)return <div className="alert alert-error">{error||"Student not found."}</div>;
  return <section className="panel profile-panel"><div className="back-row"><Link to="/students">← Back to students</Link></div><div className="profile-hero"><div className="avatar profile-avatar">{getInitials(student.name)}</div><div className="profile-main"><h2>{student.name}</h2><p>{student.email}</p><span className={`status ${String(student.status||"active").toLowerCase()}`}>{student.status||"Active"}</span></div><Link className="btn btn-primary" to={`/students/${id}/edit`}><Pencil size={16}/> Edit profile</Link></div><div className="profile-details"><div><Mail/><span><small>Email address</small><b>{student.email||"—"}</b></span></div><div><Phone/><span><small>Phone number</small><b>{student.phone||"—"}</b></span></div><div><CalendarDays/><span><small>Date of birth</small><b>{formatDate(student.dateOfBirth)}</b></span></div><div><MapPin/><span><small>Address</small><b>{student.address||"—"}</b></span></div></div><div className="profile-course"><small>ENROLLED COURSE</small><h3>{student.course?.name||student.courseName||student.course||"No course assigned"}</h3><p>Enrollment ID: {student.enrollmentId||student.studentId||"—"}</p></div></section>;
}
