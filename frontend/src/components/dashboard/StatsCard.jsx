import { ArrowUpRight } from "lucide-react";
export default function StatsCard({ title, value = 0, note, icon: Icon, tone = "blue" }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={21}/></div><div className="stat-meta"><span>{title}</span><strong>{value}</strong><small>{note || "Updated just now"}</small></div><ArrowUpRight className="stat-arrow" size={18}/></article>;
}
