'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface Certification {
  name: string;
  status: string;
  issuer?: string;
}

interface Competency {
  title: string;
  descriptor: string;
  tags: string[];
}

interface Project {
  name: string;
  category: string;
  summary: string;
  tags: string[];
  url: string;
  featured: boolean;
}

interface Contact {
  email: string;
  linkedin: string;
  github: string;
  discord: string;
}

interface Data {
  certifications: Certification[];
  competencies: Competency[];
  additionalSkills: string;
  contact: Contact;
  projects: Project[];
}

const EXPERIENCE = [
  {
    date: 'May 2024 — Present',
    title: 'Security Automation Engineer',
    org: 'Independent Projects',
    points: [
      'Built autonomous, local-first agent systems for secure operations and tooling orchestration.',
      'Engineered auditable automation flows for risk and compliance lifecycle work.',
      'Implemented secure defaults, control mapping, and workflow guardrails in deployment pipelines.',
    ],
  },
  {
    date: '2023 — 2024',
    title: 'Cybersecurity & GRC Practitioner',
    org: 'Academic and Applied Labs',
    points: [
      'Executed NIST 800-53-aligned assessments, risk registers, and remediation planning.',
      'Produced control narratives and evidence structures for SOC 2 readiness workflows.',
      'Developed repeatable templates for policy, control ownership, and operational governance.',
    ],
  },
  {
    date: 'Foundation',
    title: 'Security Operations and Cloud Security',
    org: 'Hands-on Portfolio Work',
    points: [
      'Implemented identity governance with Entra ID, PIM, and RBAC guardrails.',
      'Applied cloud posture hardening in Azure with defensive baselines and telemetry checks.',
      'Operationalized compliance and security insights for decision-ready reporting.',
    ],
  },
];

function useScrolled(threshold = 40): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

function useCursorFx(): { x: number; y: number; hovering: boolean } {
  const [cursor, setCursor] = useState({ x: 0, y: 0, hovering: false });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setCursor((prev) => ({ ...prev, x: event.clientX, y: event.clientY }));
    };

    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const hoverable = !!target?.closest('a, button, .info-card, .logo-card, .skill-card, .project-card, .cert-card');
      setCursor((prev) => ({ ...prev, hovering: hoverable }));
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return cursor;
}

export default function Portfolio({ data }: { data: Data }) {
  const scrolled = useScrolled();
  const cursor = useCursorFx();

  const [activeSkill, setActiveSkill] = useState<Competency | null>(null);
  const [activeCert, setActiveCert] = useState<Certification | null>(null);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);

  const tools = useMemo(() => {
    const seeded = [
      'Python',
      'MCP Integration',
      'NIST 800-53',
      'SOC 2',
      'Entra ID',
      'PIM',
      'RBAC',
      'CSPM',
      'Defender for Cloud',
      'ServiceNow',
      'Power BI',
      'Tableau',
      'NIST CSF',
      'ITGC',
      'OSINT',
      'Risk Register',
      'POA&M',
      'SSP',
    ];

    const merged = [...seeded];
    data.competencies.forEach((competency) => {
      competency.tags.forEach((tag) => merged.push(tag));
    });
    data.projects.forEach((project) => {
      project.tags.forEach((tag) => merged.push(tag));
    });

    const unique = Array.from(new Set(merged)).slice(0, 24);
    return unique;
  }, [data.competencies, data.projects]);

  const featuredProject = data.projects.find((project) => project.featured) ?? data.projects[0];
  const secondProject = data.projects.find((project) => !project.featured) ?? data.projects[1] ?? data.projects[0];
  const regularProjects = data.projects.filter((project) => project.name !== featuredProject.name && project.name !== secondProject?.name);

  const metrics = [
    { value: `${data.certifications.filter((certification) => certification.status === 'earned').length}+`, label: 'Certifications' },
    { value: `${data.competencies.length}+`, label: 'Core Competencies' },
    { value: `${data.projects.length}+`, label: 'Security Projects' },
    { value: '70%+', label: 'Automation Lift' },
  ];

  return (
    <main className="portfolio-root">
      <div className="grain-overlay" />
      <div className="cursor-dot" style={{ left: cursor.x, top: cursor.y }} />
      <div className={`cursor-ring ${cursor.hovering ? 'hovering' : ''}`} style={{ left: cursor.x, top: cursor.y }} />

      <nav className={`top-nav ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="brand">
          <span className="brand-main">Ifeanyi</span>
          <span className="brand-accent">Ijezie</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#certifications">Certs</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-left">
          <p className="eyebrow">{'// Autonomous Defense Console'}</p>
          <h1>
            Ifeanyi
            <span>Ijezie</span>
          </h1>
          <p className="hero-copy">
            Security Automation Engineer focused on turning governance intent into operational controls.
            I design and deploy autonomous security systems that improve reliability, traceability, and execution speed.
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#projects">View Projects</a>
            <a className="btn-outline" href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-photo-wrap">
            <Image
              src="https://avatars.githubusercontent.com/u/258281403?v=4"
              alt="Ifeanyi Ijezie"
              fill
              sizes="(max-width: 1080px) 100vw, 50vw"
              className="hero-photo"
              priority
            />
            <div className="hero-photo-overlay" />
          </div>
          <div className="hero-stat bottom-left">
            <span className="num">24/7</span>
            <span className="label">Continuous Monitoring</span>
          </div>
          <div className="hero-stat top-right">
            <span className="num">SOC 2</span>
            <span className="label">Audit Ready</span>
          </div>
        </div>

        <div className="scroll-cue">SCROLL</div>
      </section>

      <section className="ticker-wrap" aria-label="focus areas">
        <div className="ticker-track">
          {[
            'Security Automation',
            'GRC',
            'NIST 800-53',
            'Identity Governance',
            'CSPM',
            'SOC 2 Readiness',
            'Agentic Workflows',
            'Risk Analytics',
            'Continuous Controls',
          ].map((item) => (
            <span key={item}>{item} ✦</span>
          ))}
          {[
            'Security Automation',
            'GRC',
            'NIST 800-53',
            'Identity Governance',
            'CSPM',
            'SOC 2 Readiness',
            'Agentic Workflows',
            'Risk Analytics',
            'Continuous Controls',
          ].map((item) => (
            <span key={`${item}-repeat`}>{item} ✦</span>
          ))}
        </div>
      </section>

      <section className="tools-marquee" id="tools">
        <p className="section-mini">Tools I Work With</p>
        <div className="logo-row">
          <div className="logo-track ltr">
            {tools.map((tool) => (
              <button key={tool} className="logo-card" onClick={() => setActiveInfo(tool)}>
                <span className="logo-dot" />
                <span>{tool}</span>
              </button>
            ))}
            {tools.map((tool) => (
              <button key={`${tool}-clone`} className="logo-card" onClick={() => setActiveInfo(tool)}>
                <span className="logo-dot" />
                <span>{tool}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <p className="section-kicker">About</p>
        <h2>How I Build Security That Scales.</h2>
        <div className="about-layout">
          <div>
            <p className="quote">&quot;Strong security is not just policy. It is executable, observable, and resilient by design.&quot;</p>
            <p>
              My work sits at the intersection of cybersecurity engineering and governance. I design systems that turn security frameworks
              into repeatable workflows teams can run every day.
            </p>
            <p>
              From NIST-driven risk programs to cloud posture hardening and autonomous agents, I focus on delivery speed, decision clarity,
              and controls that stand up to audits.
            </p>
          </div>

          <div className="metric-grid">
            {metrics.map((metric) => (
              <article key={metric.label} className="metric-cell">
                <p className="metric-value">{metric.value}</p>
                <p className="metric-label">{metric.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="experience" id="experience">
        <p className="section-kicker">Experience</p>
        <h2>Where Strategy Meets Execution.</h2>
        <div className="timeline">
          {EXPERIENCE.map((entry, index) => (
            <article key={entry.title} className="exp-item">
              <div className="exp-date">{entry.date}</div>
              <div>
                <h3>{entry.title}</h3>
                <p className="exp-org">{entry.org}</p>
                <ul>
                  {entry.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className="exp-index">{String(index + 1).padStart(2, '0')}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="projects" id="projects">
        <p className="section-kicker">Projects</p>
        <h2>From Architecture to Operational Proof.</h2>

        <article className="project-feature">
          <div className="project-meta">AI · GRC · DevOps — Featured</div>
          <h3>{featuredProject.name}</h3>
          <p>{featuredProject.summary}</p>

          <div className="killchain">
            <div>
              <span>01</span>
              <div>
                <h4>System Definition</h4>
                <p>Designed a local-first autonomous execution model with strict trust boundaries.</p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <h4>Control Integration</h4>
                <p>Mapped workflows to enforce audit logging, secure defaults, and constrained tool-use.</p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <h4>Operational Validation</h4>
                <p>Executed scenario tests to validate reliability, traceability, and production safety.</p>
              </div>
            </div>
          </div>

          <div className="project-tags">
            {featuredProject.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <a className="view-link" href={featuredProject.url} target="_blank" rel="noopener noreferrer">View Project →</a>
        </article>

        <article className="project-feature secondary">
          <div className="project-meta">GRC · Risk Engineering</div>
          <h3>{secondProject.name}</h3>
          <p>{secondProject.summary}</p>

          <div className="terminal-stack">
            <div className="terminal-card">
              <p className="terminal-title">Risk Register Snapshot</p>
              <p>Control Gaps: 14</p>
              <p>High Risks: 4</p>
              <p>Remediation Owner Coverage: 100%</p>
            </div>
            <div className="terminal-card">
              <p className="terminal-title">Treatment Plan</p>
              <p>Mitigate: 8</p>
              <p>Transfer: 3</p>
              <p>Accept: 3</p>
            </div>
          </div>

          <div className="project-tags">
            {secondProject.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <a className="view-link" href={secondProject.url} target="_blank" rel="noopener noreferrer">View Project →</a>
        </article>

        <div className="project-grid">
          {regularProjects.map((project) => (
            <a key={project.name} className="project-card" href={project.url} target="_blank" rel="noopener noreferrer">
              <p className="project-category">{project.category}</p>
              <h4>{project.name}</h4>
              <p>{project.summary}</p>
              <div className="project-tags">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p className="view-link">View Project →</p>
            </a>
          ))}
        </div>
      </section>

      <section className="skills" id="skills">
        <p className="section-kicker">Technical Skills</p>
        <h2>Controls, Cloud, and Automation Expertise.</h2>

        <div className="skills-grid">
          {data.competencies.map((competency) => (
            <button key={competency.title} className="skill-card" onClick={() => setActiveSkill(competency)}>
              <p className="skill-category">{competency.tags.slice(0, 2).join(' · ')}</p>
              <h3>{competency.title}</h3>
              <p>{competency.descriptor}</p>
            </button>
          ))}
        </div>

        <p className="skills-extra">Also experienced in: {data.additionalSkills}</p>
      </section>

      <section className="certifications" id="certifications">
        <p className="section-kicker">Certifications</p>
        <h2>Validated Credentials and Ongoing Growth.</h2>

        <div className="cert-grid">
          {data.certifications.map((certification, index) => (
            <button key={`${certification.name}-${index}`} className="cert-card" onClick={() => setActiveCert(certification)}>
              <span className="cert-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{certification.name}</h3>
              <p>{certification.issuer ?? (certification.status === 'earned' ? 'Earned' : 'In Progress')}</p>
              <span className="cert-detail">→ Details</span>
            </button>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <p className="section-kicker">Contact</p>
        <h2>Let&apos;s Build Something Defensible.</h2>
        <p className="contact-copy">Open to cybersecurity, GRC, and security automation opportunities.</p>

        <a className="contact-email" href={`mailto:${data.contact.email}`}>{data.contact.email}</a>

        <div className="contact-links">
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={data.contact.discord} target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </section>

      <section className="thankyou">
        <div className="thankyou-inner">
          <p className="status-pill">END OF PORTFOLIO</p>
          <h2>
            Thank You.
            <em>Security Automation Engineer · GRC</em>
          </h2>
          <p>
            If this resonates with your team, I would love to connect and help turn security strategy into practical execution.
          </p>
          <p className="footer-meta">© 2026 Ifeanyi Ijezie — All Rights Reserved</p>
        </div>
      </section>

      {activeSkill && (
        <div className="modal-overlay" onClick={() => setActiveSkill(null)}>
          <article className="modal-box" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveSkill(null)}>✕</button>
            <p className="modal-tag">Skill Breakdown</p>
            <h3>{activeSkill.title}</h3>
            <p>{activeSkill.descriptor}</p>
            <div className="modal-tags">
              {activeSkill.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        </div>
      )}

      {activeCert && (
        <div className="modal-overlay" onClick={() => setActiveCert(null)}>
          <article className="modal-box" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveCert(null)}>✕</button>
            <p className="modal-tag">Credential</p>
            <h3>{activeCert.name}</h3>
            <p>
              {activeCert.status === 'earned'
                ? 'Earned credential demonstrating verified capability in this domain.'
                : 'Active certification track currently in progress.'}
            </p>
            <div className="modal-tags">
              <span>{activeCert.status === 'earned' ? 'Earned' : 'Pursuing'}</span>
              {activeCert.issuer ? <span>{activeCert.issuer}</span> : null}
            </div>
          </article>
        </div>
      )}

      {activeInfo && (
        <div className="modal-overlay" onClick={() => setActiveInfo(null)}>
          <article className="modal-box" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveInfo(null)}>✕</button>
            <p className="modal-tag">Tool Insight</p>
            <h3>{activeInfo}</h3>
            <p>
              {activeInfo} is integrated into my security engineering workflows for defensible outcomes, measurable controls,
              and repeatable delivery.
            </p>
          </article>
        </div>
      )}
    </main>
  );
}