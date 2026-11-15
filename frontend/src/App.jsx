import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Loader from "./components/common/Loader";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import AddStudent from "./pages/AddStudent";
import StudentProfile from "./pages/StudentProfile";
import Courses from "./pages/Courses";
import NotFound from "./pages/NotFound";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <Loader fullScreen text="Checking session..." />;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const { user } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="students/:id" element={<StudentProfile />} />
        <Route path="students/:id/edit" element={<AddStudent />} />
        <Route path="courses" element={<Courses />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
