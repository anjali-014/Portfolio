import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { personal, social } from "../../utils/data";
import "./Footer.css";

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="container footer__inner">
        
        {/* Left */}
        <div className="footer__left">
          <span className="footer__logo">{personal.name}</span>
          <p className="footer__tagline">
            Full-Stack Developer · Open to opportunities
          </p>
        </div>

        {/* Links */}
        <div className="footer__links">
          {["about", "skills", "projects", "experience", "contact"].map(
            (section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={scrollTo(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            )
          )}
        </div>

        {/* Social */}
        <div className="footer__social">
          {social.map(({ label, url, icon }) => {
            const Icon = iconMap[icon] || Github;
            return (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
              >
                <Icon size={17} />
              </a>
            );
          })}
        </div>

      </div>

      {/* Bottom */}
      <div className="footer__bottom">
        <div className="container">
          <p>
            © {year} {personal.name} · Built with{" "}
            <Heart
              size={12}
              className="footer__heart"
              fill="currentColor"
            />{" "}
            using React & Node.js
          </p>
        </div>
      </div>
    </footer>
  );
}