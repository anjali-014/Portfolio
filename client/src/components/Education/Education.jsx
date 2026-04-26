import { GraduationCap } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { education } from "../../utils/data";
import "./Education.css";

export default function Education() {
  const [ref, visible] = useInView();

  return (
    <section id="education" className="education">
      <div className="container" ref={ref}>
        
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="section-label">Education</p>
          <h2 className="section-title">Academic Background</h2>
        </div>

        <div className="education__grid">
          
          {education.length === 0 ? (
            <p className="education__empty">
              Add your education details here.
            </p>
          ) : (
            education.map((item, i) => (
              <div
                key={i}
                className={`education__card fade-up ${
                  visible ? "visible" : ""
                } delay-${Math.min(i + 1, 4)}`}
              >
                
                <div className="education__icon">
                  <GraduationCap size={20} />
                </div>

                <div className="education__body">
                  
                  <div className="education__header">
                    <div>
                      <h3 className="education__degree">{item.degree}</h3>
                      <p className="education__institution">
                        {item.institution}
                      </p>
                    </div>

                    <div className="education__meta">
                      <span className="education__duration">
                        {item.duration}
                      </span>

                      {item.gpa && (
                        <span className="education__gpa">
                          GPA {item.gpa}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.highlights?.length > 0 && (
                    <ul className="education__highlights">
                      {item.highlights.map((h, j) => (
                        <li key={j}>{h}</li>
                      ))}
                    </ul>
                  )}

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </section>
  );
} 