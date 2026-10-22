import { Bell, Menu, Search } from "lucide-react";

export default function Topbar({ onMenuClick, onSearch }) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={onMenuClick} aria-label="Open menu"><Menu size={22} /></button>
      <div className="breadcrumb"><span>Workspace</span><span className="crumb-slash">/</span><strong>Overview</strong></div>
      <div className="topbar-actions">
        <label className="search-box">
          <Search size={17} />
          <input aria-label="Search tasks" placeholder="Search anything..." onChange={(event) => onSearch(event.target.value)} />
          <kbd>⌘ K</kbd>
        </label>
        <button className="notification-button" aria-label="Notifications" onClick={() => alert("You're all caught up. Enjoy your focus time!")}>
          <Bell size={19} /><span />
        </button>
      </div>
    </header>
  );
}