import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import profileImg from './assets/profile.png'
import profileBackImg from './assets/profileback.png'  
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/** Scroll-triggered reveal wrapper */
function Reveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const SKILLS = [
  'PYTHON', 'PHP', 'MYSQL', 'CODEIGNITER', 'LARAVEL', 'FLASK',
  'RESTFUL APIS', 'RAZORPAY', 'POSTMAN', 'VS CODE', 'HOPSCOTCH',
]

const EDUCATION = [
  { degree: 'MCA', school: 'PSNA College of Engg & Tech', period: '2023 — 2025' },
  { degree: 'BCA', school: 'Vellalar College for Women', period: '2020 — 2023' },
  { degree: 'HSC', school: 'SriKrishna Matric Hr. Sec. School, Oddanchatram', period: '2019 — 2020' },
]

const PROJECTS = [
  {
    tag: 'E-COMMERCE',
    title: 'Znngo',
    desc: 'Full-featured e-commerce platform on CodeIgniter — product catalogs, cart workflows, auth, order management, and custom RESTful APIs for backend sync.',
    tech: ['CodeIgniter', 'REST API', 'MySQL'],
    bg: '#fdf1e0',
    fg: 'dark',
  },
  {
    tag: 'HEALTHTECH',
    title: 'Healthcare',
    desc: 'Hospital slot-booking platform with a real-time scheduling engine, Razorpay-powered billing, and REST APIs linking CRM, staff schedules, and the patient portal.',
    tech: ['Razorpay', 'CodeIgniter', 'Scheduling'],
    bg: '#ff7a3c',
    fg: 'light',
  },
  {
    tag: 'INSTITUTIONAL CRM',
    title: 'imstpedu',
    desc: 'Centralized management system digitizing student records, enrollment lifecycles, HR modules, staff attendance, and payroll processing logic.',
    tech: ['CRM', 'HR Automation', 'CodeIgniter'],
    bg: '#1c130d',
    fg: 'light',
  },
  {
    tag: 'DIRECTORY',
    title: 'Directory',
    desc: 'Professional listing platform with an intuitive UI, advanced filtering, and search — built for effortless networking between industry professionals.',
    tech: ['CodeIgniter', 'Search & Filter', 'UX'],
    bg: '#ffcf9c',
    fg: 'dark',
  },
]

const SKILL_GROUPS = [
  { label: 'Languages', items: ['Python', 'PHP'] },
  { label: 'Database', items: ['MySQL'] },
  { label: 'Web Development', items: ['PHP', 'Flask', 'CodeIgniter', 'Laravel'] },
  { label: 'IDE / Tools', items: ['Postman', 'VS Code', 'Hopscotch'] },
]

function Timeline() {
  const wrapRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className={`timeline ${started ? 'timeline-started' : ''}`} ref={wrapRef}>
      <span className="timeline-spine" />
      {EDUCATION.map((e, i) => (
        <Reveal direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 80} key={i}>
          <div className="timeline-row">
            <span className="timeline-period">{e.period}</span>
            <span className="timeline-dot" />
            <div className="timeline-body">
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

function Marquee() {
  const row = [...SKILLS, ...SKILLS]
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row.map((s, i) => (
          <span className="marquee-item" key={i}>
            {s} <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
// Delete PinnedCard entirely, and replace ProjectsPinned with this:

function ProjectsPinned({ projects }) {
  return (
    <div className="stack">
      {projects.map((project, i) => (
        <div
          key={i}
          className={`stack-card fg-${project.fg}`}
          style={{ background: project.bg, zIndex: i + 1 }}
        >
          <div className="stack-inner">
            <span className="stack-index">0{i + 1}</span>
            <span className="project-tag">{project.tag}</span>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="exp-tags stack-tags">
              {project.tech.map((t, j) => (
                <span key={j}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav-wrap">
      <div className="nav">
        <a className="nav-logo" href="#hero">Karthika<span className="nav-logo-dim">.dev</span></a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#projects" onClick={() => setOpen(false)}>Projects</a>
          <a href="#skills" onClick={() => setOpen(false)}>Skills</a>
          <a href="#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <a className="nav-cta" href="mailto:karthiarunachalam33@gmail.com">Contact me →</a>
        <button className="nav-burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}


const FLIP_START = 0.3
const FLIP_END = 0.56
const MOBILE_BREAKPOINT = 768

export function HeroBioSection() {
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Desktop Card Transforms (Keep as is)
  const rawTranslateY = useTransform(scrollYProgress, [0.3, 0.56], [0, 64]);
  const rawScale = useTransform(scrollYProgress, [0.3, 0.56], [1, 0.72]);
  const rawFrontRotateY = useTransform(scrollYProgress, [0.3, 0.56], [0, 180]);
  const rawBackRotateY = useTransform(scrollYProgress, [0.3, 0.56], [-180, 0]);

  const springConfig = { stiffness: 480, damping: 42, mass: 0.28 };
  const translateY = useSpring(rawTranslateY, springConfig);
  const scale = useSpring(rawScale, springConfig);
  const frontRotateY = useSpring(rawFrontRotateY, springConfig);
  const backRotateY = useSpring(rawBackRotateY, springConfig);

  // Content Flow - adjusted for mobile to ensure bottom content isn't cut off
  const contentY = useTransform(scrollYProgress, [0, 1], ['0vh', isMobile ? '-130vh' : '-100vh']);
  
  // Mobile Hero Opacity (Front image fades as you leave top)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={targetRef} className="majd-hero-bio-container" id="hero">
      <div className="majd-sticky-viewport">
        {/* DESKTOP STICKY CARD */}
        {!isMobile && (
          <div className="majd-avatar-sticky-wrap">
            <motion.div
              className="majd-card-face majd-card-front"
              style={{ translateY, scale, rotateY: frontRotateY }}
            >
              <img src={profileImg} alt="Karthika" />
            </motion.div>
            <motion.div
              className="majd-card-face majd-card-back"
              style={{ translateY, scale, rotateY: backRotateY }}
            >
              <img src={profileBackImg} alt="Karthika back" className="majd-card-back-img" />
            </motion.div>
          </div>
        )}

        <motion.div className="majd-content-scroll-flow" style={{ y: contentY }}>
          {/* HERO PAGE */}
          <section className="majd-hero-page">
            <div className="majd-hero-title-container">
              <h1 className="majd-hero-title">Dream. Design. Develop.<br />Building Beyond Code</h1>
              
              {isMobile && (
                <motion.div className="majd-mobile-image-wrapper" style={{ opacity: heroOpacity }}>
                  <img src={profileImg} alt="Front" className="majd-mobile-hero-img" />
                </motion.div>
              )}
            </div>

            <div className="majd-hero-footer-bar">
              <span className="majd-copyright">©2024</span>
              <span className="majd-sub-heading">/ CREATING CLEAN PLATFORMS</span>
            </div>
          </section>

          {/* BIO PAGE */}
          <section className="majd-bio-page" id="about">
            <div className="majd-bio-content-wrapper">
              <div className="majd-bio-top-text">
                <span className="majd-bio-eyebrow">/ ABOUT</span>
                <h2 className="majd-bio-heading">Hey!</h2>
                <p className="majd-bio-lead">
                  I’m Karthika, a web developer based in Tamil Nadu, India. I build reliable, scalable, and user-focused web applications,
                  turning ideas and requirements into clean, functional digital experiences.
                </p>
              </div>

{isMobile && (
  <motion.div 
    className="majd-mobile-image-wrapper"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.1 }}
  >
    <img src={profileBackImg} alt="Back" className="majd-mobile-bio-img" />
  </motion.div>
)}

              <div className="majd-bio-bottom-text">
                <p className="majd-bio-text">
                  I enjoy working across the full development process — from designing efficient database structures and building APIs to
                  creating responsive interfaces and deploying production-ready applications.
                </p>
                <div className="stat-list">
                  <div className="stat">
                    <span className="stat-num">1.5</span>
                    <span className="stat-label">Years Exp</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">04</span>
                    <span className="stat-label">Shipped</span>
                  </div>
                </div>
                <div style={{ marginTop: '40px' }}>
                   <a className="majd-bio-cta" href="#projects">See the work →</a>
                </div>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,                 // higher = slower/smoother
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    
    <div className="page">
      <Nav />

      <HeroBioSection />

      <Marquee />

      <section className="timeline-section">
        <div className="section-head">
          <span className="section-num">02</span>
          <h2 className="section-title">Education</h2>
        </div>
        <Timeline />
      </section>

      <section className="experience">
        <div className="section-head">
          <span className="section-num">03</span>
          <h2 className="section-title">Experience</h2>
        </div>
        <Reveal direction="up">
          <div className="exp-card">
            <div className="exp-top">
              <h3>Web Developer</h3>
              <span className="exp-period">1.5 years</span>
            </div>
            <p>
              Specialized in building and maintaining dynamic web applications with
              high framework. Wrote efficient, maintainable code, managed
              database structures, troubleshot complex technical issues, and collaborated
              closely with the dev team to hit strict project deadlines.
            </p>
            <div className="exp-tags">
              <span>Laravel</span><span>Django</span><span>CodeIgniter</span><span>MySQL</span><span>Team Collaboration</span>
            </div>
          </div>
        </Reveal>
      </section>

<section className="projects" id="projects">
  <div className="section-head">
    <span className="section-num">04</span>
    <h2 className="section-title">Featured Projects</h2>
  </div>
  <ProjectsPinned projects={PROJECTS} />
</section>

      <section className="skills" id="skills">
        <div className="section-head">
          <span className="section-num">05</span>
          <h2 className="section-title">Skills &amp; Tools</h2>
        </div>
        <div className="skills-grid">
          {SKILL_GROUPS.map((g, i) => (
            <div className="skill-group" key={i}>
              <h4>{g.label}</h4>
              <ul>
                {g.items.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="certs">
          <span>Python Programming — 2024</span>
          <span className="certs-sep">/</span>
          <span>PHP &amp; MySQL — 2022</span>
        </div>
      </section>

      <Marquee />

      <footer className="contact" id="contact">
        <h2 className="contact-title">Let's build<br />something reliable.</h2>
        <p className="contact-sub">Open to new roles and freelance web development work.</p>
        <a className="contact-email" href="mailto:karthiarunachalam33@gmail.com">
          karthiarunachalam33@gmail.com
        </a>
        <div className="contact-links">
          <a href="https://www.linkedin.com/in/karthika-a" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="tel:9489670805">9489670805</a>
          <span>Oddanchatram, Dindigul</span>
        </div>
        <div className="contact-foot">© {new Date().getFullYear()} Karthika A — Web Developer</div>
      </footer>
    </div>
  )
}
