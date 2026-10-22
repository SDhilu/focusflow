export default function StatCard({ icon: Icon, label, value, note, tone, progress, progressLabel }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <div className={`stat-icon stat-icon--${tone}`}><Icon size={20} strokeWidth={2} /></div>
        <span className={`stat-note ${tone === "green" ? "stat-note--green" : ""}`}>{note}</span>
      </div>
      <p className="stat-label">{label}</p>
      <div className="stat-value-row"><strong className="stat-value">{value}</strong>{progressLabel && <span className="stat-progress-label">{progressLabel}</span>}</div>
      {typeof progress === "number" && <div className="mini-progress"><span style={{ width: `${progress}%` }} /></div>}
    </article>
  );
}