import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { studentService } from "../../services/studentService";
import { courseService } from "../../services/courseService";
import { getErrorMessage } from "../../services/api";
import Loader from "../common/Loader";

const empty = { name: "", email: "", phone: "", gender: "", dateOfBirth: "", address: "", course: "", status: "active" };
export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    courseService.getAll().then(r => setCourses(r.courses || r.data?.courses || r.data || [] )).catch(() => {});
    if (id) studentService.getById(id).then(r => setForm({...empty, ...(r.student || r.data?.student || r.data || r)})).catch(e => setError(getErrorMessage(e))).finally(() => setLoading(false));
  }, [id]);

  const change = (e) => setForm({...form, [e.target.name]: e.target.value});
  const submit = async (e) => {
    e.preventDefault(); setError(""); setSaving(true);
    try {
      const payload = {...form};
      if (!payload.course) delete payload.course;
      if (id) await studentService.update(id, payload); else await studentService.create(payload);
      navigate("/students");
    } catch (e) { setError(getErrorMessage(e)); }
    finally { setSaving(false); }
  };

  if (loading) return <Loader text="Loading student..." />;
  return <form className="form-card" onSubmit={submit}>
    {error && <div className="alert alert-error">{error}</div>}
    <div className="form-grid">
      <label>Full name *<input name="name" value={form.name || ""} onChange={change} required placeholder="Enter full name"/></label>
      <label>Email address *<input type="email" name="email" value={form.email || ""} onChange={change} required placeholder="student@example.com"/></label>
      <label>Phone number<input name="phone" value={form.phone || ""} onChange={change} placeholder="Enter phone number"/></label>
      <label>Gender<select name="gender" value={form.gender || ""} onChange={change}><option value="">Select gender</option><option>Male</option><option>Female</option><option>Other</option></select></label>
      <label>Date of birth<input type="date" name="dateOfBirth" value={form.dateOfBirth ? String(form.dateOfBirth).slice(0,10) : ""} onChange={change}/></label>
      <label>Course<select name="course" value={form.course?._id || form.course || ""} onChange={change}><option value="">Select course</option>{courses.map(c => <option key={c._id || c.id} value={c._id || c.id}>{c.name || c.title}</option>)}</select></label>
      <label>Status<select name="status" value={form.status || "active"} onChange={change}><option value="active">Active</option><option value="inactive">Inactive</option></select></label>
      <label className="span-2">Address<textarea name="address" value={form.address || ""} onChange={change} rows="3" placeholder="Student address"/></label>
    </div>
    <div className="form-actions"><button type="button" className="btn btn-light" onClick={() => navigate("/students")}>Cancel</button><button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : id ? "Update student" : "Add student"}</button></div>
  </form>;
}
