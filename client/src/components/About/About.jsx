import { useInView } from "../../hooks/useInView";
import { personal } from "../../utils/data";
import "./About.css";

// Keep stats minimal & real (update later)
const highlights = [
  { value: "—", label: "Projects Built" },
  { value: "—", label: "Technologies Used" },
];

export default function About() {
  const [ref, visible] = useInView();

  return (
    <section id="about" className="about">
      <div className="container" ref={ref}>
        
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Who I Am</h2>
        </div>

        <div className="about__grid">
          
          {/* Bio */}
          <div className={`about__bio fade-up ${visible ? "visible" : ""} delay-1`}>
            <p className="about__bio-text">{personal.bio}</p>

            <p className="about__bio-sub">
              I enjoy building real-world applications and continuously improving my skills in full-stack development.
            </p>

            {/* Interests (make them realistic) */}
            <div className="about__interests">
              {["Web Development", "Problem Solving", "UI Design", "Learning New Tech"].map((tag) => (
                <span key={tag} className="about__tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className={`about__stats fade-up ${visible ? "visible" : ""} delay-2`}>
            {highlights.map(({ value, label }) => (
              <div key={label} className="about__stat-card">
                <span className="about__stat-value">{value}</span>
                <span className="about__stat-label">{label}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}