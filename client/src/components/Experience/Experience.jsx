import { Trophy, Briefcase } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { experience, achievements } from "../../utils/data";
import "./Experience.css";

export default function Experience() {
  const [ref, visible] = useInView();

  return (
    <section id="experience" className="experience">
      <div className="container" ref={ref}>
        
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="section-label">Experience</p>
          <h2 className="section-title">My Journey So Far</h2>
        </div>

        <div className="experience__grid">
          
          {/* Work / Learning Timeline */}
          <div className={`fade-up ${visible ? "visible" : ""} delay-1`}>
            <div className="experience__section-header">
              <Briefcase size={16} />
              <span>Work / Learning</span>
            </div>

            <div className="experience__timeline">
              
              {experience.length === 0 ? (
                <p className="experience__empty">
                  Currently building projects and improving my full-stack development skills.
                </p>
              ) : (
                experience.map((item, i) => (
                  <div key={i} className="timeline__item">
                    <div className="timeline__dot" />

                    <div className="timeline__content">
                      <div className="timeline__header">
                        <h3 className="timeline__role">{item.role}</h3>
                        <span className="timeline__duration">
                          {item.duration}
                        </span>
                      </div>

                      <p className="timeline__company">{item.company}</p>
                      <p className="timeline__desc">{item.description}</p>

                      <div className="timeline__tech">
                        {item.tech?.map((t) => (
                          <span key={t} className="timeline__tech-tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}

            </div>
          </div>

          {/* Achievements */}
          <div className={`fade-up ${visible ? "visible" : ""} delay-2`}>
            <div className="experience__section-header">
              <Trophy size={16} />
              <span>Achievements</span>
            </div>

            {achievements.length === 0 ? (
              <p className="experience__empty">
                Working on building projects and achievements.
              </p>
            ) : (
              <ul className="achievements__list">
                {achievements.map((item, i) => (
                  <li key={i} className="achievements__item">
                    <span className="achievements__bullet">✦</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}