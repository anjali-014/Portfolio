import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { personal } from "../../utils/data";
import "./Navbar.css";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      let current = "";
      navLinks.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (section && window.scrollY >= section.offsetTop - 120) {
          current = href.slice(1);
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);

    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="container navbar__inner">
          
          {/* Logo */}
          <a
            href="#"
            className="navbar__logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="navbar__logo-mark">
              {personal.name?.charAt(0)}
            </span>
            <span className="navbar__logo-name">{personal.name}</span>
          </a>

          {/* Desktop Links */}
          <ul className="navbar__links">
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`navbar__link ${
                    active === href.slice(1) ? "navbar__link--active" : ""
                  }`}
                  onClick={(e) => handleLinkClick(e, href)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={personal.resume}
              download
              className="btn btn-primary btn-sm"
            >
              <Download size={14} />
              Resume
            </a>

            <button
              className="icon-btn navbar__hamburger"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}>
        <ul>
          {navLinks.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={active === href.slice(1) ? "active" : ""}
                onClick={(e) => handleLinkClick(e, href)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-menu__footer">
          <a href={personal.resume} download className="btn btn-primary">
            <Download size={15} /> Download Resume
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}