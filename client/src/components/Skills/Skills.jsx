import { useInView } from "../../hooks/useInView";
import { skills } from "../../utils/data";
import "./Skills.css";

const categoryColors = {
  Frontend: "#2563eb",
  Backend: "#7c3aed",
  Database: "#059669",
  Tools: "#d97706",
};

export default function Skills() {
  const [ref, visible] = useInView();

  return (
    <section id="skills" className="skills">
      <div className="container" ref={ref}>
        
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technologies I Work With</h2>
          <p className="section-subtitle">
            Tools and technologies I use to build modern web applications.
          </p>
        </div>

        <div className="skills__grid">
          {Object.entries(skills).map(([category, items], i) => (
            <div
              key={category}
              className={`skills__card fade-up ${
                visible ? "visible" : ""
              } delay-${Math.min(i + 1, 5)}`} // prevent too many delays
            >
              
              <div className="skills__card-header">
                <span
                  className="skills__dot"
                  style={{
                    background: categoryColors[category] || "var(--accent)",
                  }}
                />
                <h3 className="skills__category">{category}</h3>
                <span className="skills__count">{items.length}</span>
              </div>

              <div className="skills__tags">
                {items.map((skill) => (
                  <span key={skill} className="skills__tag">
                    {skill}
                  </span>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}