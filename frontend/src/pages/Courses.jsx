import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CourseTable from "../components/courses/CourseTable";
import CourseForm from "../components/courses/CourseForm";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Loader from "../components/common/Loader";
import { courseService } from "../services/courseService";
import { getErrorMessage } from "../services/api";
import { getId } from "../utils/validators";

export default function Courses() {
  const [courses,setCourses]=useState([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(""); const [showForm,setShowForm]=useState(false); const [editing,setEditing]=useState(null); const [saving,setSaving]=useState(false); const [selected,setSelected]=useState(null);
  const load=()=>{setLoading(true);courseService.getAll().then(r=>setCourses(r.courses||r.data?.courses||r.data||[])).catch(e=>setError(getErrorMessage(e))).finally(()=>setLoading(false));};
  useEffect(()=>{load();},[]);
  const save=async payload=>{setSaving(true);setError("");try{if(editing)await courseService.update(getId(editing),payload);else await courseService.create(payload);setShowForm(false);setEditing(null);load();}catch(e){setError(getErrorMessage(e));}finally{setSaving(false);}};
  const remove=async()=>{try{await courseService.remove(getId(selected));setSelected(null);load();}catch(e){setError(getErrorMessage(e));}};
  return <section className="panel"><div className="panel-heading"><div><h3>Course catalogue <span className="count-chip">{courses.length}</span></h3><p>Create and manage courses offered by your institution.</p></div><button className="btn btn-primary" onClick={()=>{setEditing(null);setShowForm(true);}}><Plus size={17}/> Add course</button></div>{error&&<div className="alert alert-error">{error}</div>}{showForm&&<div className="inline-form"><div className="panel-heading"><div><h3>{editing?"Edit course":"New course"}</h3></div></div><CourseForm initial={editing||{}} onSave={save} onCancel={()=>{setShowForm(false);setEditing(null);}} saving={saving}/></div>}{loading?<Loader text="Loading courses..."/>:<CourseTable courses={courses} onEdit={c=>{setEditing(c);setShowForm(true);}} onDelete={setSelected}/>}<ConfirmDialog open={Boolean(selected)} title="Delete course?" message={`Delete ${selected?.name||"this course"}?`} onCancel={()=>setSelected(null)} onConfirm={remove}/></section>;
}
