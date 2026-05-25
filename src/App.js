import React, { useEffect, useRef, useState } from 'react';
import './App.css';

/* ── REVEAL HOOK ── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.unobserve(e.target); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar() {
  const [active, setActive] = useState('');
  useEffect(() => {
    const onScroll = () => {
      document.querySelectorAll('section[id]').forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) setActive(s.id);
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = ['About', 'Skills', 'Experience', 'Projects', 'Contact'];
  return (
    <nav className="navbar">
      <ul className="nav-links">
        {links.map(l => (
          <li key={l}>
            <a href={`#${l.toLowerCase()}`} className={active === l.toLowerCase() ? 'active' : ''}>
              {l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ── HERO ── */
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-tag">Frontend Developer · UI/UX · AI Integration</div>
        <h1>Aakansha<br /><em>Tyagi.</em></h1>
        <p className="hero-sub">Building interfaces that think, feel, and perform.</p>
        <p className="hero-desc">
          2+ years crafting production-grade React.js applications — from AI-powered legal platforms
          serving 100K+ records to high-traffic consumer products. I bring both engineering precision
          and design sensibility to every pixel.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn-primary"><span>View My Work</span></a>
          <a href="#contact" className="btn-outline">Get In Touch</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ── ABOUT ── */
function About() {
  const stats = [
    { num: '2+', label: 'Years Production Experience' },
    { num: '100+', label: 'Enterprise Clients Served' },
    { num: '100K+', label: 'Records Handled' },
    { num: '20%', label: 'Performance Improvement' },
  ];
  return (
    <section className="about" id="about">
      <div className="section-label">About Me</div>
      <div className="about-grid">
        <div className="about-text">
          <h2>Developer.<br /><em>Designer.</em><br />Problem Solver.</h2>
          <div className="divider" />
          <p>I'm a frontend developer who sits at the intersection of <strong>engineering and design</strong>. I don't just build features — I build experiences. From translating Figma mockups pixel-perfectly to integrating cutting-edge AI/LLM capabilities.</p>
          <p>My recent work at <strong>Legistify</strong> involved building AI-augmented legal research tools — semantic search, RAG-style chatbots, and complex document viewers — used by 100+ enterprise clients daily.</p>
          <p>Available for <strong>immediate joining</strong> — full-time, remote, or hybrid — anywhere across India or internationally.</p>
        </div>
        <div className="about-stats">
          {stats.map((s, i) => (
            <Reveal key={s.num} delay={i * 80}>
              <div className="stat-card">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── SKILLS ── */
function Skills() {
  const groups = [
    { title: '⟡ Core Languages', tags: ['JavaScript ES6+', 'HTML5', 'CSS3', 'SQL'] },
    { title: '⟡ Frameworks & Libraries', tags: ['React.js', 'Redux Toolkit', 'React Router', 'Tailwind CSS', 'Bootstrap', 'Axios', 'Node.js'] },
    { title: '⟡ AI / LLM Integration', tags: ['Semantic Search', 'RAG-style Chatbots', 'Prompt Engineering', 'Generative AI UI'] },
    { title: '⟡ UI / UX & Design', tags: ['Figma', 'Adobe XD', 'Wireframing', 'Prototyping', 'Design Systems', 'Responsive Design'] },
    { title: '⟡ APIs & Data', tags: ['REST APIs', 'JSON', 'PostgreSQL', 'Postman'] },
    { title: '⟡ DevOps & Tooling', tags: ['Git & GitHub', 'CI/CD', 'Code Reviews', 'Agile / Scrum'] },
  ];
  return (
    <section className="skills" id="skills">
      <div className="section-label">Technical Arsenal</div>
      <h2>What I <em>Build With</em></h2>
      <div className="skills-grid">
        {groups.map((g, i) => (
          <Reveal key={g.title} delay={i * 60}>
            <div className="skill-group">
              <div className="skill-group-title">{g.title}</div>
              <div className="skill-tags">
                {g.tags.map(t => <span key={t} className="skill-tag">{t}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── EXPERIENCE ── */
function Experience() {
  const jobs = [
    {
      company: 'Legistify', period: 'Jun 2025 — Apr 2026',
      role: 'Software Developer (SDE1) · Gurgaon, India',
      points: [
        'Built Bare Act — a production legal research platform in React.js handling 100K+ court cases and legal records.',
        'Integrated AI-powered semantic search and structured legal-document rendering, helping 100+ enterprise clients reduce manual lookup time by ~50%.',
        'Built InDoc — a scalable legal-document viewer supporting thousands of court documents across multiple courts.',
      ]
    },
    {
      company: 'Collegedunia', period: 'Jul 2024 — May 2025',
      role: 'Web Developer · Gurgaon, India',
      points: [
        'Optimized 10+ REST API integrations on a high-traffic live consumer product, improving system performance by 20%.',
        'Resolved 30+ production bugs and delivered 5+ UX enhancements, lifting user-experience scores by 12%.',
      ]
    },
  ];
  return (
    <section className="experience" id="experience">
      <div className="section-label">Work History</div>
      <h2>Where I've <em>Made Impact</em></h2>
      <div className="exp-timeline">
        {jobs.map((job, i) => (
          <Reveal key={job.company} delay={i * 100}>
            <div className="exp-item">
              <div className="exp-meta">
                <span className="exp-company">{job.company}</span>
                <span className="exp-period">{job.period}</span>
              </div>
              <div className="exp-role">{job.role}</div>
              <ul className="exp-points">
                {job.points.map((p, j) => <li key={j}>{p}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── PROJECTS ── */
function Projects() {
  const projects = [
    {
      num: '01', title: 'InDoc & Bare Act',
      desc: 'AI-augmented legal research platform serving 100K+ legal records and 100+ enterprise clients. Built complete React.js frontend with AI-powered semantic search, RAG-style LLM chatbot, and Figma-to-React UI workflows.',
      stack: ['React.js', 'Redux Toolkit', 'AI Search', 'LLM/RAG', 'REST APIs', 'Figma'],
      link: null,
    },
    {
      num: '02', title: 'Suryura',
      desc: '5-in-1 wellness web app — habit tracker with streak heatmap, to-do, calorie/macros tracker, BMI, and TDEE calculator. Built in vanilla JS with zero frameworks. Custom glassmorphism dark UI with animated SVG progress rings.',
      stack: ['HTML5', 'CSS3', 'Vanilla JS', 'SVG Animation', 'localStorage', 'GitHub Pages'],
      link: 'https://github.com/AakanshaTyagi01/suryura',
    },
    {
      num: '03', title: 'Booksie',
      desc: 'E-commerce bookstore with payment gateway integration. Achieved 35% faster page load and 15% organic traffic lift. Pixel-perfect Figma-designed storefront built in React.js.',
      stack: ['React.js', 'JavaScript', 'SQL', 'Bootstrap', 'Figma', 'Payment Gateway'],
      link: null,
    },
  ];
  return (
    <section className="projects-section" id="projects">
      <div className="section-label">Selected Work</div>
      <h2>Projects That <em>Shipped</em></h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <Reveal key={p.num} delay={i * 100}>
            <div className="project-card">
              <div className="project-num">{p.num}</div>
              <div className="project-title">{p.title}</div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map(s => <span key={s}>{s}</span>)}
              </div>
              {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="project-link">View on GitHub →</a>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── DESIGN ── */
function Design() {
  const items = [
    { icon: '◈', title: 'Figma to React', desc: 'Pixel-perfect translation of design mockups into production-ready React components — every shadow and spacing accounted for.' },
    { icon: '◎', title: 'Design Systems', desc: 'Building scalable, reusable component libraries and design tokens that maintain consistency across large-scale applications.' },
    { icon: '◇', title: 'Responsive & Accessible', desc: 'Mobile-first, cross-browser compatible interfaces — every layout tested, every interaction polished.' },
    { icon: '⊕', title: 'Wireframing & Prototyping', desc: 'End-to-end UX flow — from low-fidelity wireframes to interactive Figma prototypes.' },
    { icon: '◉', title: 'AI-Augmented Interfaces', desc: 'Designing frontend experiences for AI products — search, chatbots, semantic highlighting, and LLM-powered features.' },
    { icon: '⟡', title: 'Performance-First', desc: 'Bundle optimization, render efficiency, lazy loading — beautiful interfaces that are also blazing fast.' },
  ];
  return (
    <section className="design" id="design">
      <div className="section-label">UI / UX Capabilities</div>
      <h2>Design Is Not <em>Decoration</em></h2>
      <div className="design-grid">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 60}>
            <div className="design-item">
              <span className="design-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ── CONTACT ── */
function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div className="section-label centered">Let's Connect</div>
        <h2>Available for <em>Immediate</em> Opportunities</h2>
        <p>Open to full-time roles, freelance projects, and collaborations — across India or remote internationally.</p>
        <a href="mailto:aakanshatyagi019@gmail.com" className="contact-email-link">
          aakanshatyagi019@gmail.com
        </a>
        <a href="tel:+918588087733" className="contact-phone">+91 85880 87733</a>
        <div className="divider" style={{ margin: '2rem auto' }} />
        <div className="contact-links">
          <a href="https://linkedin.com/in/aakansha-tyagi-at1" target="_blank" rel="noreferrer" className="contact-link">↗ LinkedIn</a>
          <a href="https://github.com/AakanshaTyagi01" target="_blank" rel="noreferrer" className="contact-link">↗ GitHub</a>
          <a href="https://github.com/AakanshaTyagi01/suryura" target="_blank" rel="noreferrer" className="contact-link">↗ Live Project</a>
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer>
      <p>© 2026 <span>Aakansha Tyagi</span>. Crafted with precision.</p>
      <p>React.js · UI/UX · <span>AI Integration</span></p>
    </footer>
  );
}

/* ── CURSOR ── */
function Cursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const mouseX = useRef(0); const mouseY = useRef(0);
  const ringX = useRef(0); const ringY = useRef(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const move = (e) => {
      mouseX.current = e.clientX; mouseY.current = e.clientY;
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };
    const over = (e) => setHovered(!!(e.target.closest('a') || e.target.closest('button')));
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    const animate = () => {
      ringX.current += (mouseX.current - ringX.current) * 0.12;
      ringY.current += (mouseY.current - ringY.current) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringX.current + 'px';
        ringRef.current.style.top = ringY.current + 'px';
      }
      requestAnimationFrame(animate);
    };
    animate();
    return () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className={`cursor-ring${hovered ? ' hovered' : ''}`} ref={ringRef} />
    </>
  );
}

/* ── APP ── */
export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Design />
      <Contact />
      <Footer />
    </>
  );
}
