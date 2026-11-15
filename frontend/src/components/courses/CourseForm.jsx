import { useState } from "react";
export default function CourseForm({ initial = {}, onSave, onCancel, saving }) {
  const [form, setForm] = useState({name: initial.name || "", code: initial.code || "", description: initial.description || "", duration: initial.duration || "", status: initial.status || "active"});
  const change = e => setForm({...form, [e.target.name]: e.target.value});
  return <form className="form-card compact-form" onSubmit={e => {e.preventDefault(); onSave(form);}}>
    <div className="form-grid"><label>Course name *<input name="name" value={form.name} onChange={change} required/></label><label>Course code<input name="code" value={form.code} onChange={change}/></label><label>Duration<input name="duration" value={form.duration} onChange={change} placeholder="e.g. 6 months"/></label><label>Status<select name="status" value={form.status} onChange={change}><option value="active">Active</option><option value="inactive">Inactive</option></select></label><label className="span-2">Description<textarea name="description" value={form.description} onChange={change} rows="3"/></label></div>
    <div className="form-actions"><button type="button" className="btn btn-light" onClick={onCancel}>Cancel</button><button className="btn btn-primary" disabled={saving}>{saving ? "Saving..." : "Save course"}</button></div>
  </form>;
}
