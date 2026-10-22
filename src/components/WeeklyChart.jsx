import { starterWeek } from "../data/initialData";

export default function WeeklyChart({ tasks }) {
  // A simple visual summary. Starter values keep the chart attractive on day one.
  const week = starterWeek;
  const max = Math.max(...week.map((item) => item.value));

  return (
    <section className="panel weekly-panel">
      <div className="panel-heading">
        <div><h2>Weekly activity</h2><p>Your consistency is looking good</p></div>
        <button className="select-pill" onClick={() => alert("Showing your current weekly overview.")}>This week <span>⌄</span></button>
      </div>
      <div className="chart-summary"><strong>{tasks.filter((task) => task.done).length + 18}<span> tasks completed</span></strong><span className="chart-trend">↗ 12.8% <small>vs last week</small></span></div>
      <div className="bar-chart" role="img" aria-label="Weekly activity bar chart">
        {week.map((item, index) => (
          <div className="bar-column" key={item.day}>
            <div className="bar-track">
              <div className={`bar-fill ${index === 3 ? "bar-fill--highlight" : ""}`} style={{ height: `${(item.value / max) * 100}%` }}>
                {index === 3 && <span className="bar-tooltip">7 tasks</span>}
              </div>
            </div>
            <span className={`bar-day ${index === 3 ? "bar-day--active" : ""}`}>{item.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}