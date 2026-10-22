import { useState } from "react";
import { ArrowUpRight, Check, Clock3, Plus, Trash2 } from "lucide-react";

const filters = ["All tasks", "In progress", "Completed"];

export default function TaskList({ tasks, setTasks, searchTerm = "" }) {
  const [filter, setFilter] = useState("All tasks");
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");

  const visibleTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All tasks" ||
      (filter === "Completed" && task.done) ||
      (filter === "In progress" && !task.done);
    return matchesSearch && matchesFilter;
  });

  function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;
    setTasks((current) => [
      { id: Date.now(), title: title.trim(), category, time: "Anytime", priority, done: false },
      ...current,
    ]);
    setTitle("");
    setCategory("Work");
    setPriority("Medium");
    setShowForm(false);
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <section className="panel tasks-panel">
      <div className="panel-heading task-heading">
        <div><h2>Today's tasks <span className="heading-count">{tasks.length}</span></h2><p>A little progress each day adds up</p></div>
        <button className="primary-button" onClick={() => setShowForm((open) => !open)}><Plus size={17} /> Add task</button>
      </div>

      {showForm && (
        <form className="add-task-form" onSubmit={addTask}>
          <label className="form-full">Task name<input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What do you want to get done?" required /></label>
          <label>Category<select value={category} onChange={(e) => setCategory(e.target.value)}><option>Work</option><option>Personal</option><option>Learning</option><option>Health</option></select></label>
          <label>Priority<select value={priority} onChange={(e) => setPriority(e.target.value)}><option>Low</option><option>Medium</option><option>High</option></select></label>
          <div className="form-actions"><button type="button" className="text-button" onClick={() => setShowForm(false)}>Cancel</button><button className="primary-button" type="submit">Save task</button></div>
        </form>
      )}

      <div className="task-filters" role="tablist" aria-label="Filter tasks">
        {filters.map((item) => <button key={item} role="tab" aria-selected={filter === item} className={filter === item ? "filter-button filter-button--active" : "filter-button"} onClick={() => setFilter(item)}>{item}</button>)}
      </div>

      <div className="task-list">
        {visibleTasks.map((task) => (
          <article className={`task-row ${task.done ? "task-row--done" : ""}`} key={task.id}>
            <button className={`task-check ${task.done ? "task-check--checked" : ""}`} onClick={() => toggleTask(task.id)} aria-label={task.done ? `Mark ${task.title} incomplete` : `Complete ${task.title}`}>{task.done && <Check size={14} strokeWidth={3} />}</button>
            <div className="task-main"><strong>{task.title}</strong><div className="task-meta"><span className={`category-dot category-dot--${task.category.toLowerCase()}`} />{task.category}<span className="meta-divider">·</span><Clock3 size={13} />{task.time}</div></div>
            <span className={`priority priority--${task.priority.toLowerCase()}`}>{task.priority}</span>
            <button className="delete-task" aria-label={`Delete ${task.title}`} onClick={() => deleteTask(task.id)}><Trash2 size={15} /></button>
          </article>
        ))}
        {visibleTasks.length === 0 && <div className="empty-state"><div className="empty-icon"><Check size={22} /></div><strong>No tasks found</strong><span>Try another filter or add a new task.</span></div>}
      </div>
      <div className="task-footer"><span>Showing {visibleTasks.length} of {tasks.length} tasks</span><button className="view-all-button" onClick={() => setFilter("All tasks")}>View all <ArrowUpRight size={15} /></button></div>
    </section>
  );
}