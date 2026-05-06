import { useState, useEffect, useRef } from "react";
import "./App.css";

function useInView(ref, options = {}) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!options.once === false) observer.unobserve(entry.target);
        }
      },
      { threshold: options.threshold || 0.15, ...options }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.once, options.threshold]);
  return inView;
}

function useScrollSpy(sectionIds) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sectionIds]);
  return active;
}

function GlowViewport() {
  useEffect(() => {
    const el = document.createElement("div");
    el.className = "glow-viewport";
    document.body.prepend(el);

    const handleMouseMove = (e) => {
      const x = ((e.clientX / window.innerWidth) * 100).toFixed(1);
      const y = ((e.clientY / window.innerHeight) * 100).toFixed(1);
      el.style.setProperty("--mouse-x", `${x}%`);
      el.style.setProperty("--mouse-y", `${y}%`);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      el.remove();
    };
  }, []);

  return null;
}
const PROJECTS = [
  {
    num: "01",
    title: "AiMi",
    subtitle: "Senior Capstone",
    description:
      "A collaborative visual storytelling platform for illustrated books and shared canvases. Real-time multiplayer with WebSocket cursor tracking for up to 10 concurrent users, Google Gemini AI for mood analysis and writing suggestions, a multi-page book editor with flip transitions, gamified coin shop, and MinIO-backed storage with ONNX background removal.",
    stack: [
      "Vue 3",
      "TypeScript",
      "Go (Fiber)",
      "MongoDB",
      "MinIO",
      "Google Gemini API",
      "WebSockets",
      "Docker",
      "GitHub Actions",
    ],
    github: null,
    video: null,
    images: [
      "/screenshots/aimi/landing.png",
      "/screenshots/aimi/dashboard.png",
      "/screenshots/aimi/content.png",
      "/screenshots/aimi/shop.png",
    ],
    layout: "wide",
    accent: "var(--color-accent-2)",
  },
  {
    num: "02",
    title: "Kidngai",
    subtitle: "Production Web App",
    description:
      "A comprehensive Thai-language calculator platform with 17 specialized tools deployed to kidngai.com via Vercel. Built with Next.js 14 and TypeScript, featuring real-time input validation, responsive mobile-first UI with dark mode, and Vitest-tested calculation logic (263 tests), serving over 10,000 monthly users.",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Vitest",
      "Vercel",
      "TailwindCSS",
      "SEO Optimization",
    ],
    github: "https://kidngai.com",
    video: null,
    images: [
      "/screenshots/kidngai/home.png",
      "/screenshots/kidngai/tax.png",
      "/screenshots/kidngai/compound.png",
      "/screenshots/kidngai/ot.png",
    ],
    layout: "reversed",
    accent: "var(--color-accent-3)",
  },
  {
    num: "03",
    title: "Krandan Kanban",
    subtitle: "Course Project · 2024",
    description:
      "Kanban task management with drag-and-drop boards, JWT-secured REST API, and Spring Security role-based access. Containerized with Docker Compose for consistent local and deployment environments.",
    stack: [
      "Spring Boot",
      "Vue.js",
      "MySQL",
      "Spring Security",
      "Docker Compose",
    ],
    github: "https://github.com/Teamsyy/backend-OR3",
    images: [
      "/screenshots/or3/board.png",
      "/screenshots/or3/login.png",
      "/screenshots/or3/task-detail.png",
      "/screenshots/or3/manage-status.png",
    ],
    layout: "compact",
    accent: "var(--color-accent)",
  },
];

const SKILLS = [
  {
    category: "Frontend",
    items: "Vue 3, React, TypeScript, TailwindCSS, Vite",
  },
  { category: "Backend", items: "Go (Fiber), Spring Boot, Python (FastAPI)" },
  { category: "Data", items: "MongoDB, MySQL" },
  { category: "DevOps", items: "Docker, GitHub Actions, Nginx" },
  { category: "Tools", items: "WebSockets, JWT, REST APIs, Git" },
];

function Nav({ theme, toggleTheme, activeSection }) {
  return (
    <nav className="nav" aria-label="Main navigation">
      <a href="#" className="nav__name">
        Taspol Thuanchamnan
      </a>
      <div className="nav__links">
        <a href="#projects" className={activeSection === "projects" ? "nav__link--active" : ""}>Projects</a>
        <a href="#about" className={activeSection === "about" ? "nav__link--active" : ""}>About</a>
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "LIGHT" : "DARK"}
        </button>
        <TerminalLink href="mailto:taspol.thua@kmutt.ac.th">Contact</TerminalLink>
      </div>
    </nav>
  );
}

function BlueprintCanvas({ accent }) {
  const [coords, setCoords] = useState({ x: 124.5, y: 89.2 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const normX = (x / rect.width) * 200;
    const normY = (y / rect.height) * 150;
    
    setCoords({ 
      x: normX.toFixed(1), 
      y: normY.toFixed(1) 
    });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 124.5, y: 89.2 });
  };

  return (
    <div 
      className="blueprint" 
      style={{ "--b-accent": accent }}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="blueprint__grid" />
      <div className="blueprint__coords">X: {coords.x} Y: {coords.y}</div>
      <div className="registration-mark registration-mark--tl" />
      <div className="registration-mark registration-mark--tr" />
      <div className="registration-mark registration-mark--bl" />
      <div className="registration-mark registration-mark--br" />
    </div>
  );
}

function ProjectCarousel({ title, images, accent }) {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) return <BlueprintCanvas accent={accent} />;

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <div className="carousel" style={{ "--ca-accent": accent }}>
      <div className="carousel__viewport">
        <img
          src={images[current]}
          alt={`${title} screenshot ${current + 1}`}
          className="carousel__img"
        />
        {images.length > 1 && (
          <>
            <button className="carousel__btn carousel__btn--prev" onClick={prev} aria-label="Previous screenshot">
              ‹
            </button>
            <button className="carousel__btn carousel__btn--next" onClick={next} aria-label="Next screenshot">
              ›
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="carousel__dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot ${i === current ? "carousel__dot--active" : ""}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectImage({ title, images, video, accent }) {
  if (video) {
    return (
      <video
        src={video}
        className="project__visual"
        autoPlay
        loop
        muted
        playsInline
        aria-label={`${title} demonstration video`}
      />
    );
  }

  if (images && images.length > 0) {
    return <ProjectCarousel title={title} images={images} accent={accent} />;
  }

  return <BlueprintCanvas accent={accent} />;
}

function AnimatedSection({ children, className = "", direction = "up", threshold }) {
  const ref = useRef(null);
  const inView = useInView(ref, { threshold });
  const dirClass = direction === "left" ? "fade-in--left" 
    : direction === "right" ? "fade-in--right" 
    : direction === "scale" ? "scale-in" : "";
  const baseClass = direction === "scale" ? "scale-in" : "fade-in";
  return (
    <div
      ref={ref}
      className={`${baseClass} ${dirClass} ${inView ? baseClass + "--visible " + dirClass + "--visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function Project({ project, reversed }) {
  return (
    <article className={`project ${reversed ? "project--reversed" : ""}`} aria-label={`Project: ${project.title}`}>
      <div className="project__image-container">
        <div className="workbench__frame">
          <ProjectImage
            title={project.title}
            images={project.images}
            video={project.video}
            accent={project.accent}
          />
          <div className="registration-mark registration-mark--tl" />
          <div className="registration-mark registration-mark--tr" />
          <div className="registration-mark registration-mark--bl" />
          <div className="registration-mark registration-mark--br" />
        </div>
      </div>
      <div className="project__content">
        <span className="project__num">{project.num}</span>
        <h3 className="project__title">{project.title}</h3>
        <span className="project__sub">{project.subtitle}</span>
        <p className="project__desc">{project.description}</p>
        <div className="workbench__tags">
          {project.stack.map((s) => (
            <span key={s} className="workbench__tag">
              {s}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function DecryptedText({ text }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <>{display}</>;
}

function TerminalLink({ href, children, className }) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e) => {
    if (href.startsWith("mailto:")) {
      e.preventDefault();
      const email = href.replace("mailto:", "");
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <a 
      href={href} 
      onClick={handleClick}
      className={`${className} ${copied ? "terminal-link--copied" : ""}`}
      target={!href.startsWith("mailto:") ? "_blank" : undefined}
      rel={!href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
    >
      {copied ? "[COPIED_TO_CLIPBOARD]" : children}
    </a>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const activeSection = useScrollSpy(["projects", "about"]);

  return (
    <>
      <GlowViewport />
      <Nav theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />

      <main>
        <section className="hero">
          <div className="registration-mark registration-mark--tl" />
          <div className="registration-mark registration-mark--tr" />
          <div className="registration-mark registration-mark--bl" />
          <div className="registration-mark registration-mark--br" />
          <div>
            <p className="hero__label fade-in fade-in--visible" style={{transitionDelay: "0.1s"}}>
              Full-Stack Developer · Bangkok, Thailand
            </p>
            <h1 className="hero__name fade-in fade-in--visible" style={{transitionDelay: "0.2s"}}>
              <DecryptedText text="Taspol" />
              <br />
              <DecryptedText text="Thuanchamnan" />
            </h1>
            <p className="hero__bio fade-in fade-in--visible" style={{transitionDelay: "0.3s"}}>
              4th-year IT student at KMUTT building full-stack systems with
              Vue, Go, Spring Boot, and Python.
            </p>
            <div className="hero__links fade-in fade-in--visible" style={{transitionDelay: "0.4s"}}>
              <TerminalLink href="mailto:taspol.thua@kmutt.ac.th" className="hero__link">
                Email
              </TerminalLink>
              <a href="https://github.com/Teamsyy" className="hero__link" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="inner">
            <AnimatedSection direction="left">
              <h2 className="section__label">Selected Work</h2>
            </AnimatedSection>
            <div className="projects-list">
              <AnimatedSection threshold={0.1}>
                <Project project={PROJECTS[0]} />
              </AnimatedSection>
              <AnimatedSection direction="right" threshold={0.1}>
                <Project project={PROJECTS[1]} reversed />
              </AnimatedSection>
              <AnimatedSection threshold={0.1}>
                <Project project={PROJECTS[2]} />
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="inner">
            <AnimatedSection direction="left">
              <div className="entry-group">
                <h2 className="section__label">Experience</h2>
                <div className="entry-list">
                  <AnimatedSection direction="right" threshold={0.1}>
                    <div className="entry">
                      <div className="entry__meta-block">
                        <span className="entry__period">Jan 2025 – Jun 2025</span>
                        <span className="entry__org">Stream IT Consulting</span>
                      </div>
                      <div>
                        <h3 className="entry__title">QA Intern</h3>
                        <p className="entry__detail">
                          Manual and automated testing across web applications. Bug
                          identification, regression tracking, and quality
                          documentation.
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" threshold={0.1}>
              <div className="entry-group">
                <h2 className="section__label">Education</h2>
                <div className="entry-list">
                  <AnimatedSection direction="right" threshold={0.1}>
                    <div className="entry">
                      <div className="entry__meta-block">
                        <span className="entry__period">2022 – present</span>
                      </div>
                      <div>
                        <h3 className="entry__title">KMUTT</h3>
                        <span className="entry__org">School of Information Technology</span>
                        <p className="entry__detail">
                          Integrated Project I – II, Client-Side Programming,
                          Server-Side Programming, DevOps.
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" threshold={0.1}>
              <div className="entry-group">
                <h2 className="section__label">Skills</h2>
                <div className="skills-list">
                  {SKILLS.map((row, i) => (
                    <AnimatedSection key={row.category} threshold={0.1}>
                      <div className="skill-row">
                        <span className="skill-row__cat">{row.category}</span>
                        <span className="skill-row__items">{row.items}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <footer>
        <div className="inner">
          <div className="footer-workbench">
            <div className="registration-mark registration-mark--tl" />
            <div className="registration-mark registration-mark--tr" />
            <div className="registration-mark registration-mark--bl" />
            <div className="registration-mark registration-mark--br" />
            
            <div className="footer-grid">
              <div className="footer__info">
                <span className="footer__label">SYSTEM_TERMINAL</span>
                <div className="footer__links">
                  <TerminalLink href="mailto:taspol.thua@kmutt.ac.th" className="footer__link">
                    taspol.thua@kmutt.ac.th
                  </TerminalLink>
                  <a href="https://github.com/Teamsyy" className="footer__link" target="_blank" rel="noopener noreferrer">
                    GITHUB.COM/TEAMSYY
                  </a>
                </div>
              </div>
              
              <div className="footer__meta-block">
                <span className="footer__label">BUILD_INFO</span>
                <p className="footer__meta">LOC: BANGKOK, THAILAND</p>
                <p className="footer__meta">REL: 2026.05.03_V1.0</p>
                <p className="footer__meta">STATUS: SYSTEM_READY</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </>
  );
}

export default App;
