export default function ConfirmDialog({ open, title = "Are you sure?", message, onCancel, onConfirm, busy = false }) {
  if (!open) return null;
  return <div className="modal-backdrop" role="presentation">
    <div className="modal-card" role="dialog" aria-modal="true">
      <div className="modal-icon">!</div>
      <h3>{title}</h3>
      <p>{message || "This action cannot be undone."}</p>
      <div className="modal-actions">
        <button className="btn btn-light" onClick={onCancel} disabled={busy}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm} disabled={busy}>{busy ? "Deleting..." : "Delete"}</button>
      </div>
    </div>
  </div>;
}
