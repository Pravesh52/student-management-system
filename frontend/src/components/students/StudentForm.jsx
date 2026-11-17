
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { studentService } from "../../services/studentService";
import { courseService } from "../../services/courseService";
import { getErrorMessage } from "../../services/api";
import Loader from "../common/Loader";

const empty = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  course: "",
  status: "active",
};

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    courseService
      .getAll()
      .then((r) =>
        setCourses(r.courses || r.data?.courses || r.data || [])
      )
      .catch(() => {});

    if (id) {
      studentService
        .getById(id)
        .then((r) => {
          const student =
            r.student || r.data?.student || r.data || r;

          setForm({
            ...empty,
            name: [student.firstName, student.lastName]
              .filter(Boolean)
              .join(" "),
            email: student.email || "",
            phone: student.phone || "",
            gender: student.gender || "",
            dateOfBirth: student.dateOfBirth
              ? String(student.dateOfBirth).slice(0, 10)
              : "",
            address: student.address || "",
            course: student.course?._id || student.course || "",
            status: String(student.status || "Active").toLowerCase(),
          });
        })
        .catch((e) => setError(getErrorMessage(e)))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts.shift();
    const lastName = nameParts.join(" ");

    if (!firstName || !lastName) {
      setError("Please enter both first name and last name.");
      return;
    }

    if (!form.email.trim()) {
      setError("Email address is required.");
      return;
    }

    setSaving(true);

    try {
      const payload = {
        firstName,
        lastName,
        email: form.email.trim(),
        phone: form.phone,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth || null,
        address: form.address,
        course: form.course,
        status: form.status === "active" ? "Active" : "Inactive",
      };

      if (!payload.course) {
        delete payload.course;
      }

      if (id) {
        await studentService.update(id, payload);
      } else {
        await studentService.create(payload);
      }

      navigate("/students");
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loader text="Loading student..." />;
  }

  return (
    <form className="form-card" onSubmit={submit}>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="form-grid">
        <label>
          Full name *
          <input
            name="name"
            value={form.name || ""}
            onChange={change}
            required
            placeholder="Enter first name and last name"
          />
        </label>

        <label>
          Email address *
          <input
            type="email"
            name="email"
            value={form.email || ""}
            onChange={change}
            required
            placeholder="student@example.com"
          />
        </label>

        <label>
          Phone number
          <input
            name="phone"
            value={form.phone || ""}
            onChange={change}
            placeholder="Enter phone number"
          />
        </label>

        <label>
          Gender
          <select name="gender" value={form.gender || ""} onChange={change}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Date of birth
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth || ""}
            onChange={change}
          />
        </label>

        <label>
          Course
          <select
            name="course"
            value={form.course || ""}
            onChange={change}
          >
            <option value="">Select course</option>
            {courses.map((c) => (
              <option key={c._id || c.id} value={c._id || c.id}>
                {c.name || c.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Status
          <select
            name="status"
            value={form.status || "active"}
            onChange={change}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>

        <label className="span-2">
          Address
          <textarea
            name="address"
            value={form.address || ""}
            onChange={change}
            rows="3"
            placeholder="Student address"
          />
        </label>
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => navigate("/students")}
        >
          Cancel
        </button>

        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Saving..." : id ? "Update student" : "Add student"}
        </button>
      </div>
    </form>
  );
}
