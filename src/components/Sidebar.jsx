import { CalendarDays, ChartNoAxesCombined, CircleHelp, LayoutDashboard, ListTodo, Settings, Sparkles, Target, X } from "lucide-react";

const navigation = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "My Tasks", icon: ListTodo, count: "4" },
  { label: "Habits", icon: Target },
  { label: "Insights", icon: ChartNoAxesCombined },
];

export default function Sidebar({ activePage, onNavigate, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && <button className="sidebar-backdrop" aria-label="Close menu" onClick={onClose} />}
      <aside className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><Sparkles size={21} strokeWidth={2.5} /></div>
          <span>focus<span className="brand-light">flow</span></span>
          <button className="icon-button sidebar-close" onClick={onClose} aria-label="Close navigation"><X size={19} /></button>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon, count }) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "nav-item--active" : ""}`}
              onClick={() => { onNavigate(label); onClose(); }}
            >
              <Icon size={19} strokeWidth={1.9} />
              <span>{label}</span>
              {count && <span className="nav-count">{count}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon"><Sparkles size={18} /></div>
            <p className="upgrade-title">Make room for more</p>
            <p className="upgrade-copy">Small steps add up to big things. Keep your momentum going!</p>
            <div className="upgrade-progress"><span /></div>
            <div className="upgrade-foot"><span>Weekly focus</span><strong>4 of 7 days</strong></div>
          </div>
          <button className="nav-item utility-item" onClick={() => alert("You're all set! FocusFlow keeps your data on this device.")}><CircleHelp size={18} /><span>Help & support</span></button>
          <button className="nav-item utility-item" onClick={() => alert("Settings are coming soon. Your tasks and habits are saved locally.")}><Settings size={18} /><span>Settings</span></button>
          <div className="profile">
            <div className="avatar">DS</div>
            <div className="profile-info"><strong>Dhilushan</strong><span>Free workspace</span></div>
            <button className="more-button" aria-label="Profile options" onClick={() => alert("Profile settings are coming soon.")}>•••</button>
          </div>
        </div>
      </aside>
    </>
  );
}