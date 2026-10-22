import { Activity, BookOpen, Check, Droplet, NotebookPen, Plus, Sprout } from "lucide-react";

const icons = { droplet: Droplet, "book-open": BookOpen, activity: Activity, "notebook-pen": NotebookPen, sprout: Sprout };
const colorNames = ["blue", "peach", "green", "purple"];

export default function HabitTracker({ habits, setHabits }) {
  const completed = habits.filter((habit) => habit.done).length;
  const progress = habits.length ? Math.round((completed / habits.length) * 100) : 0;

  function toggleHabit(id) {
    setHabits((current) => current.map((habit) => habit.id === id ? { ...habit, done: !habit.done } : habit));
  }

  function addHabit() {
    const name = window.prompt("What habit would you like to track?");
    if (!name?.trim()) return;
    setHabits((current) => [...current, {
      id: Date.now(),
      name: name.trim(),
      icon: "sprout",
      done: false,
      color: colorNames[current.length % colorNames.length],
    }]);
  }

  return (
    <section className="panel habit-panel">
      <div className="panel-heading">
        <div><h2>Daily habits</h2><p>Build routines that stick</p></div>
        <button className="icon-button add-habit-button" onClick={addHabit} aria-label="Add a habit"><Plus size={19} /></button>
      </div>
      <div className="habit-progress-wrap">
        <div className="habit-ring" style={{ "--progress": `${progress * 3.6}deg` }}><div className="habit-ring-inner"><strong>{progress}%</strong><span>done</span></div></div>
        <div className="habit-progress-copy"><strong>You're doing great!</strong><span>{completed} of {habits.length} habits completed today.</span><div className="habit-mini-progress"><span style={{ width: `${progress}%` }} /></div></div>
      </div>
      <div className="habit-list">
        {habits.map((habit) => {
          const Icon = icons[habit.icon] || Sprout;
          return (
            <div className={`habit-row ${habit.done ? "habit-row--done" : ""}`} key={habit.id}>
              <div className={`habit-icon habit-icon--${habit.color}`}><Icon size={18} /></div>
              <span className="habit-name">{habit.name}</span>
              <button className={`habit-check ${habit.done ? "habit-check--done" : ""}`} onClick={() => toggleHabit(habit.id)} aria-label={habit.done ? `Uncheck ${habit.name}` : `Complete ${habit.name}`}>{habit.done && <Check size={13} strokeWidth={3} />}</button>
            </div>
          );
        })}
        {habits.length === 0 && <p className="habit-empty">Add a habit to start building your routine.</p>}
      </div>
      <button className="habit-add-link" onClick={addHabit}><Plus size={16} /> Add a new habit</button>
    </section>
  );
}