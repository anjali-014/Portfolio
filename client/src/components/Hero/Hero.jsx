import { ArrowDown, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import { personal, social } from "../../utils/data";
import "./Hero.css";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Hero() {
  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [firstName, lastName = ""] = personal.name.split(" ");

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        
        {/* Left — text */}
        <div className="hero__content">
          <div className="hero__badge fade-up visible">
            <span className="hero__badge-dot" />
            Available for opportunities
          </div>

          <h1 className="hero__name fade-up visible delay-1">
            {firstName}{" "}
            <span className="hero__name-last">{lastName}</span>
          </h1>

          <p className="hero__title fade-up visible delay-2">
            {personal.title}
          </p>

          <p className="hero__tagline fade-up visible delay-3">
            {personal.tagline}
          </p>

          <div className="hero__location fade-up visible delay-3">
            <MapPin size={14} />
            {personal.location}
          </div>

          <div className="hero__actions fade-up visible delay-4">
            <a href="#projects" className="btn btn-primary" onClick={scrollTo("projects")}>
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline" onClick={scrollTo("contact")}>
              Get in Touch
            </a>
          </div>

          <div className="hero__social fade-up visible delay-5">
            {social.map(({ label, url, icon }) => {
              const Icon = iconMap[icon] || Github;
              return (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero__social-link"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right — avatar */}
        <div className="hero__visual fade-in visible delay-2">
          <div className="hero__avatar-wrapper">
            <div className="hero__avatar-ring" />

            {personal.avatar ? (
              <img
                src={personal.avatar}
                alt={personal.name}
                className="hero__avatar-img"
              />
            ) : (
              <div className="hero__avatar-placeholder">
                {personal.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            )}
          </div>

          {/* ⚠️ Replace these later with real data */}
          <div className="hero__stat hero__stat--tl">
            <span className="hero__stat-value">--</span>
            <span className="hero__stat-label">Experience</span>
          </div>

          <div className="hero__stat hero__stat--br">
            <span className="hero__stat-value">--</span>
            <span className="hero__stat-label">Projects</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        className="hero__scroll-hint"
        onClick={scrollTo("about")}
        aria-label="Scroll down"
      >
        <ArrowDown size={16} />
      </button>
    </section>
  );
}