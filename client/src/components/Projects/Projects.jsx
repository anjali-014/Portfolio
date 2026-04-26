import { useState } from "react";
import { Github, ExternalLink, Star } from "lucide-react";
import { useInView } from "../../hooks/useInView";
import { projects } from "../../utils/data";
import "./Projects.css";

// Generate tags safely
const allTags = ["All", ...new Set(projects.flatMap((p) => p.tech || []))];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [ref, visible] = useInView();

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tech?.includes(activeFilter));

  return (
    <section id="projects" className="projects">
      <div className="container" ref={ref}>
        
        <div className={`fade-up ${visible ? "visible" : ""}`}>
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I’ve Built</h2>
          <p className="section-subtitle">
            A selection of projects showcasing my work in full-stack development.
          </p>
        </div>

        {/* Filters */}
        <div className={`projects__filters fade-up ${visible ? "visible" : ""} delay-1`}>
          {allTags.map((tag) => (
            <button
              key={tag}
              className={`projects__filter-chip ${
                activeFilter === tag ? "active" : ""
              }`}
              onClick={() => setActiveFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects__grid">
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              visible={visible}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="projects__empty">
            <p>No projects match this filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, visible }) {
  return (
    <article
      className={`project-card fade-up ${
        visible ? "visible" : ""
      } delay-${Math.min((index % 3) + 1, 3)}`}
    >
      
      {project.featured && (
        <div className="project-card__featured">
          <Star size={11} fill="currentColor" />
          Featured
        </div>
      )}

      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__desc">{project.description}</p>

      <div className="project-card__tech">
        {project.tech?.map((t) => (
          <span key={t} className="project-card__tech-tag">
            {t}
          </span>
        ))}
      </div>

      <div className="project-card__links">
        
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link"
          >
            <Github size={15} />
            Code
          </a>
        )}

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card__link project-card__link--demo"
          >
            <ExternalLink size={15} />
            Live
          </a>
        )}

      </div>
    </article>
  );
}