import { useMemo, useState } from "react";
import { Activity, CheckCheck, Clock3, Flame, ListTodo } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import WelcomeBanner from "./components/WelcomeBanner";
import StatCard from "./components/StatCard";
import WeeklyChart from "./components/WeeklyChart";
import TaskList from "./components/TaskList";
import HabitTracker from "./components/HabitTracker";
import { starterHabits, starterTasks } from "./data/initialData";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("focusflow-tasks", starterTasks);
  const [habits, setHabits] = useLocalStorage("focusflow-habits", starterHabits);
  const [activePage, setActivePage] = useState("Overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const completedTasks = tasks.filter((task) => task.done).length;
  const inProgressTasks = tasks.length - completedTasks;
  const completedHabits = habits.filter((habit) => habit.done).length;
  const focusMinutes = 125;

  const pageTitle = useMemo(() => ({
    Overview: "A little progress goes a long way.",
    "My Tasks": "Make space for what matters.",
    Habits: "Small routines, meaningful change.",
    Insights: "Look how far you've come.",
  }[activePage] || "Welcome back"), [activePage]);

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={setActivePage} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main className="main-area">
        <Topbar onMenuClick={() => setMobileOpen(true)} onSearch={setSearchTerm} />
        <div className="page-content">
          <div className="page-intro"><div><div className="eyebrow">YOUR PERSONAL SPACE</div><h2>{activePage === "Overview" ? "Good morning, Dhilushan " : activePage}<span className="wave">{activePage === "Overview" ? "✦" : ""}</span></h2><p>{pageTitle}</p></div><button className="date-button"><Clock3 size={16} /> Your focus space</button></div>

          {activePage === "Overview" && <WelcomeBanner completed={completedTasks} total={tasks.length} />}

          <div className="stats-grid">
            <StatCard icon={ListTodo} label="Total tasks" value={tasks.length} note="Your to-do list" tone="purple" />
            <StatCard icon={CheckCheck} label="Completed" value={completedTasks} note={`${tasks.length ? Math.round(completedTasks / tasks.length * 100) : 0}% of total`} tone="green" progress={tasks.length ? completedTasks / tasks.length * 100 : 0} />
            <StatCard icon={Flame} label="Habits done" value={`${completedHabits}/${habits.length}`} note="Keep the streak" tone="peach" />
            <StatCard icon={Activity} label="Focus time" value={`${Math.floor(focusMinutes / 60)}h ${focusMinutes % 60}m`} note="This week" tone="blue" />
          </div>

          {activePage === "Insights" ? (
            <div className="insights-grid"><WeeklyChart tasks={tasks} /><section className="panel insight-note"><div className="stat-icon stat-icon--purple"><Flame size={20} /></div><h2>Keep your momentum</h2><p>Consistency beats intensity. A few focused minutes every day can make a real difference.</p><div className="insight-metric"><strong>{completedTasks}</strong><span>tasks completed so far</span></div></section></div>
          ) : activePage === "Habits" ? (
            <div className="single-panel"><HabitTracker habits={habits} setHabits={setHabits} /></div>
          ) : activePage === "My Tasks" ? (
            <div className="single-panel"><TaskList tasks={tasks} setTasks={setTasks} searchTerm={searchTerm} /></div>
          ) : (
            <div className="dashboard-grid">
              <div className="dashboard-main"><WeeklyChart tasks={tasks} /><TaskList tasks={tasks} setTasks={setTasks} searchTerm={searchTerm} /></div>
              <div className="dashboard-side"><HabitTracker habits={habits} setHabits={setHabits} /><section className="quote-card"><div className="quote-mark">“</div><p>You don't have to see the whole staircase, just take the first step.</p><span>— Martin Luther King Jr.</span><div className="quote-decoration">✳</div></section></div>
            </div>
          )}

          <footer className="app-footer"><span>Made with <span className="footer-heart">♥</span> and a little focus.</span><span><span className="save-dot" /> Your progress is saved on this device</span></footer>
        </div>
      </main>
    </div>
  );
}