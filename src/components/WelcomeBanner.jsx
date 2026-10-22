import { ArrowUpRight, Sun } from "lucide-react";

export default function WelcomeBanner({ completed, total }) {
  const date = new Date();
  const dateLabel = date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <section className="welcome-banner">
      <div className="welcome-copy">
        <div className="date-chip"><Sun size={14} /> {dateLabel}</div>
        <h1>Make today <span>count.</span></h1>
        <p>Every small step moves you closer to where you want to be. Let's make it a good one.</p>
        <div className="welcome-progress-row"><div className="welcome-progress"><span style={{ width: `${progress}%` }} /></div><span>{completed} of {total} tasks completed</span></div>
      </div>
      <div className="banner-art" aria-hidden="true">
        <div className="art-orbit art-orbit--one" /><div className="art-orbit art-orbit--two" />
        <div className="art-sun"><Sun size={31} /></div>
        <div className="art-card art-card--top"><span className="art-check">✓</span><span>One thing at a time</span></div>
        <div className="art-card art-card--bottom"><span className="art-sparkle">✦</span><span>You're on your way!</span><ArrowUpRight size={15} /></div>
        <div className="art-star art-star--one">✦</div><div className="art-star art-star--two">✧</div>
      </div>
    </section>
  );
}