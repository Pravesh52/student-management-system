import { useState } from "react";
import { GraduationCap, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getErrorMessage } from "../services/api";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [show,setShow] = useState(false);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const submit = async e => {
    e.preventDefault(); setError(""); setBusy(true);
    try { await login({email,password}); navigate("/dashboard",{replace:true}); }
    catch(err) { setError(getErrorMessage(err)); }
    finally { setBusy(false); }
  };
  return <div className="login-page"><div className="login-decoration"><div className="login-orb orb-one"/><div className="login-orb orb-two"/><div className="login-brand"><div className="brand-mark"><GraduationCap size={27}/></div><b>Campus<span>Flow</span></b></div><div className="login-message"><span className="pill-light">STUDENT MANAGEMENT PLATFORM</span><h1>Manage your campus.<br/><em>Empower every student.</em></h1><p>A smarter way to manage students, courses and academic operations — all in one place.</p><div className="login-illustration"><div className="illus-card card-a"> <div className="illus-dot"/>Student records <strong>2,450+</strong></div><div className="illus-card card-b">Academic overview <div className="illus-bars"><i/><i/><i/><i/><i/></div></div><div className="illus-circle">✦</div></div></div><small className="login-copy">© {new Date().getFullYear()} CampusFlow. All rights reserved.</small></div><div className="login-panel"><form className="login-form" onSubmit={submit}><div className="mobile-login-brand"><div className="brand-mark"><GraduationCap/></div><b>Campus<span>Flow</span></b></div><span className="eyebrow">WELCOME BACK</span><h2>Sign in to your account</h2><p className="muted">Enter your administrator credentials to continue.</p>{error && <div className="alert alert-error">{error}</div>}<label className="login-label">Email address<div className="input-icon"><Mail size={18}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="admin@example.com" required autoComplete="username"/></div></label><label className="login-label">Password<div className="input-icon"><LockKeyhole size={18}/><input type={show?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" required autoComplete="current-password"/><button type="button" className="password-toggle" onClick={()=>setShow(!show)} aria-label="Toggle password visibility">{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div></label><button className="btn btn-primary login-submit" disabled={busy}>{busy?"Signing in...":"Sign in to dashboard"} <span>→</span></button><p className="login-hint">Administrator access only. Contact your system administrator if you need help.</p></form></div></div>;
}
