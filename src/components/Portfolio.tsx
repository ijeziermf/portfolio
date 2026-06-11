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

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  stargazers_count: number;
  language: string | null;
  topics?: string[];
}

type SkillInsight = {
  industryApplication: string;
  businessValue: string;
  deliverables: string[];
};

type CertInsight = {
  focusArea: string;
  industryApplication: string;
  practicalValue: string;
};

type ToolInsight = {
  whyImportant: string;
  whyTrustMe: string;
  experienceBackup: string[];
};

const CERT_INSIGHTS: Record<string, CertInsight> = {
  'CompTIA Security+': {
    focusArea: 'Security operations baseline, threats, architecture, and incident response.',
    industryApplication: 'Used to validate hands-on defensive security capability for analyst and engineering-track roles.',
    practicalValue: 'Supports SOC workflows, secure implementation decisions, and control-minded risk discussions.',
  },
  'Microsoft SC-900': {
    focusArea: 'Microsoft security, compliance, and identity fundamentals across cloud workloads.',
    industryApplication: 'Directly applies to Entra ID governance, Defender tooling, and M365 security architecture.',
    practicalValue: 'Improves cloud-control design and strengthens security conversations with Azure-first teams.',
  },
  'Lean Six Sigma Yellow Belt': {
    focusArea: 'Process improvement, waste reduction, and measurable operational outcomes.',
    industryApplication: 'Useful in compliance automation and repeatable control execution programs.',
    practicalValue: 'Helps turn ad hoc security tasks into stable, efficient workflows with clear KPIs.',
  },
  'Professional Communication': {
    focusArea: 'Executive-ready communication and stakeholder-facing clarity.',
    industryApplication: 'Critical for policy rollout, audit communication, and risk narrative development.',
    practicalValue: 'Bridges technical findings with business decisions for leadership and non-technical stakeholders.',
  },
  CISM: {
    focusArea: 'Security governance, program management, and enterprise risk leadership.',
    industryApplication: 'Aligns with GRC leadership roles and organization-wide control strategy.',
    practicalValue: 'Strengthens governance design, risk ownership models, and board-level security reporting.',
  },
  CISSP: {
    focusArea: 'Broad-domain security architecture, engineering, and management practices.',
    industryApplication: 'Supports senior security engineering and architect responsibilities across domains.',
    practicalValue: 'Elevates end-to-end decision making for secure system design and enterprise defense maturity.',
  },
};

const SKILL_INSIGHTS: Record<string, SkillInsight> = {
  'Autonomous Agent Architecture': {
    industryApplication: 'Applied to secure AI operations, orchestration controls, and controlled tool-use in production-like environments.',
    businessValue: 'Reduces analyst toil while preserving traceability and policy guardrails.',
    deliverables: ['Agent policy boundaries', 'Execution logs and audit trails', 'Task orchestration blueprints'],
  },
  'NIST SP 800-53 / RMF (Steps 1-6)': {
    industryApplication: 'Core to regulated environments requiring formal control mapping, authorization workflows, and continuous monitoring.',
    businessValue: 'Improves audit readiness and enables risk-based investment decisions.',
    deliverables: ['System Security Plan inputs', 'POA&M artifacts', 'Control gap and remediation roadmap'],
  },
  'Identity & Access Governance': {
    industryApplication: 'Supports zero trust and least-privilege programs in cloud and hybrid enterprises.',
    businessValue: 'Reduces privileged access risk and improves access accountability.',
    deliverables: ['PIM role models', 'Access review workflows', 'Conditional access control design'],
  },
  'Risk Assessment & Compliance Automation': {
    industryApplication: 'Used in internal audit, advisory, and security operations for repeatable risk lifecycle execution.',
    businessValue: 'Accelerates assessment cycles and improves evidence quality for governance stakeholders.',
    deliverables: ['Risk registers and heat maps', 'Treatment plans', 'Automated evidence collection flows'],
  },
  'Cloud Security Posture Management': {
    industryApplication: 'Applied to Azure environments to continuously evaluate cloud misconfigurations and policy drift.',
    businessValue: 'Improves remediation speed and strengthens cloud compliance posture.',
    deliverables: ['Secure Score optimization plans', 'CSPM findings triage', 'Hardening baselines'],
  },
  'Security Automation Engineering': {
    industryApplication: 'Transforms manual security and compliance tasks into deterministic workflows.',
    businessValue: 'Improves consistency, lowers operational cost, and increases control reliability.',
    deliverables: ['Automation pipelines', 'Validation test harnesses', 'Operational runbooks'],
  },
  'SOC 2 Readiness & ITGC': {
    industryApplication: 'Key for SaaS organizations preparing for or maintaining SOC 2 attestation.',
    businessValue: 'Shortens readiness timelines and clarifies control ownership.',
    deliverables: ['Control ownership matrix', 'Gap analysis reports', 'Remediation planning package'],
  },
  'OSINT & Threat Intelligence': {
    industryApplication: 'Enhances threat awareness programs and early warning workflows.',
    businessValue: 'Improves incident prioritization and proactive defensive posture.',
    deliverables: ['Threat intelligence briefs', 'Correlation notes', 'Actionable monitoring recommendations'],
  },
};

const TOOL_INSIGHTS: Record<string, ToolInsight> = {
  Python: {
    whyImportant: 'Python is the backbone for security automation, risk processing, and repeatable control workflows.',
    whyTrustMe: 'I use Python to build practical systems that move from idea to operational security outcomes.',
    experienceBackup: [
      'Built autonomous local-first agent systems with Python-driven orchestration.',
      'Engineered auditable automation flows for risk and compliance lifecycle execution.',
      'Developed security automation pipelines with validation and operational runbooks.',
    ],
  },
  'MCP Integration': {
    whyImportant: 'MCP integration allows controlled tool use so AI systems can execute security tasks safely and reliably.',
    whyTrustMe: 'I design agent workflows with strict guardrails, traceability, and bounded actions.',
    experienceBackup: [
      'Implemented constrained tool-use patterns in autonomous security projects.',
      'Applied secure defaults and workflow guardrails in deployment pipelines.',
      'Delivered orchestration designs that preserve auditability and control intent.',
    ],
  },
  'NIST 800-53': {
    whyImportant: 'NIST 800-53 provides a structured control baseline for securing systems in regulated environments.',
    whyTrustMe: 'I have repeatedly mapped controls, assessed gaps, and built remediation paths against this framework.',
    experienceBackup: [
      'Executed NIST 800-53 aligned assessments and risk registers.',
      'Produced remediation planning artifacts tied to control gaps.',
      'Used NIST structure to improve audit readiness and monitoring workflows.',
    ],
  },
  'SOC 2': {
    whyImportant: 'SOC 2 matters because customers and stakeholders need evidence that security controls are operating effectively.',
    whyTrustMe: 'I create readiness workflows that connect policies, ownership, and evidence into audit-defensible execution.',
    experienceBackup: [
      'Produced control narratives and evidence structures for SOC 2 readiness.',
      'Built repeatable templates for ownership and governance operations.',
      'Delivered remediation planning that supports trust criteria outcomes.',
    ],
  },
  'Entra ID': {
    whyImportant: 'Identity is the primary security boundary in cloud environments, and Entra ID drives that control plane.',
    whyTrustMe: 'I have implemented identity governance patterns that enforce least privilege and access accountability.',
    experienceBackup: [
      'Implemented Entra ID governance with PIM and RBAC guardrails.',
      'Applied conditional access patterns to reduce identity risk exposure.',
      'Operationalized access review practices for ongoing control hygiene.',
    ],
  },
  PIM: {
    whyImportant: 'Privileged Identity Management reduces standing admin access and lowers blast radius during compromise.',
    whyTrustMe: 'I use PIM in governance designs that convert privileged access into controlled, time-bound elevation.',
    experienceBackup: [
      'Implemented PIM role governance in hands-on cloud security projects.',
      'Integrated least-privilege practices into access control architecture.',
      'Supported review and accountability workflows around privileged roles.',
    ],
  },
  RBAC: {
    whyImportant: 'RBAC enforces least privilege at scale by aligning permissions to business roles and responsibilities.',
    whyTrustMe: 'I have applied RBAC as a practical risk reduction mechanism, not just a policy statement.',
    experienceBackup: [
      'Designed role-based guardrails in Entra ID governance work.',
      'Mapped access scopes to operational duties for better control clarity.',
      'Used RBAC patterns in broader identity governance implementations.',
    ],
  },
  CSPM: {
    whyImportant: 'CSPM continuously detects cloud misconfigurations before they become incidents or audit failures.',
    whyTrustMe: 'I use CSPM findings to prioritize remediation and improve measurable cloud posture over time.',
    experienceBackup: [
      'Applied cloud posture hardening with defensive baselines in Azure.',
      'Worked through CSPM and secure score improvement activities.',
      'Translated technical findings into governance-ready remediation priorities.',
    ],
  },
  'Defender for Cloud': {
    whyImportant: 'Defender for Cloud gives actionable security posture insight across cloud resources and control domains.',
    whyTrustMe: 'I have used it to drive practical hardening plans and compliance-aligned security improvements.',
    experienceBackup: [
      'Executed secure score optimization and posture remediation workflows.',
      'Mapped cloud security findings to NIST-aligned controls and actions.',
      'Operationalized defensive baselines supported by telemetry checks.',
    ],
  },
  ServiceNow: {
    whyImportant: 'ServiceNow is important for turning risk and control work into accountable, trackable operational tasks.',
    whyTrustMe: 'I connect governance outcomes to workflow execution so remediation is assigned, tracked, and closed.',
    experienceBackup: [
      'Built repeatable governance templates that align with operational ownership.',
      'Structured remediation work into clear lifecycle steps and responsibilities.',
      'Focused on auditable execution, not one-off compliance activity.',
    ],
  },
  'Power BI': {
    whyImportant: 'Power BI helps translate security and risk data into decision-ready views for leadership and stakeholders.',
    whyTrustMe: 'I use data storytelling to make control posture and remediation priorities immediately clear.',
    experienceBackup: [
      'Operationalized compliance and security insights for decision-ready reporting.',
      'Supported risk communication with measurable metrics and trends.',
      'Connected technical findings to business-level security decisions.',
    ],
  },
  Tableau: {
    whyImportant: 'Tableau strengthens risk communication by visualizing trends, outliers, and treatment progress.',
    whyTrustMe: 'I focus on dashboards that explain risk posture and next actions, not vanity metrics.',
    experienceBackup: [
      'Produced reporting structures that support governance decisions.',
      'Used visual analysis patterns to communicate remediation priorities.',
      'Aligned security metrics with stakeholder outcomes and accountability.',
    ],
  },
  'NIST CSF': {
    whyImportant: 'NIST CSF provides a business-friendly way to organize security capability across identify, protect, detect, respond, and recover.',
    whyTrustMe: 'I apply framework thinking to map strategy into concrete controls and operating workflows.',
    experienceBackup: [
      'Developed governance templates aligned to structured control models.',
      'Executed risk and remediation work using recognized framework approaches.',
      'Used framework language to align technical and business stakeholders.',
    ],
  },
  ITGC: {
    whyImportant: 'ITGC establishes baseline control reliability across access, change, and operations.',
    whyTrustMe: 'I integrate ITGC concepts into readiness work so controls are testable and sustainable.',
    experienceBackup: [
      'Produced control ownership and evidence structures for readiness efforts.',
      'Built repeatable governance artifacts for operational consistency.',
      'Mapped remediation to control weaknesses for practical closure.',
    ],
  },
  OSINT: {
    whyImportant: 'OSINT improves early threat awareness by surfacing external signals before risk escalates internally.',
    whyTrustMe: 'I apply OSINT in a structured way that supports monitoring decisions and response prioritization.',
    experienceBackup: [
      'Developed threat intelligence competency aligned with action-focused outputs.',
      'Connected monitoring insights to risk treatment and defensive planning.',
      'Used correlated findings to improve proactive security posture.',
    ],
  },
  'Risk Register': {
    whyImportant: 'A risk register is critical for turning scattered issues into prioritized, owned, and trackable decisions.',
    whyTrustMe: 'I build risk registers as operational tools that drive treatment, not static documents.',
    experienceBackup: [
      'Executed risk register development in NIST-aligned assessments.',
      'Produced treatment recommendations tied to impact and likelihood.',
      'Used register workflows inside automation-focused advisory projects.',
    ],
  },
  'POA&M': {
    whyImportant: 'POA&M formalizes remediation by defining owners, timelines, and closure criteria for control gaps.',
    whyTrustMe: 'I use POA&M discipline to keep remediation measurable and auditable from discovery to closure.',
    experienceBackup: [
      'Mapped identified control gaps into structured remediation plans.',
      'Built governance artifacts that support accountable execution tracking.',
      'Aligned remediation packages to readiness and continuous monitoring goals.',
    ],
  },
  SSP: {
    whyImportant: 'The System Security Plan documents how controls are implemented, inherited, and operated in real systems.',
    whyTrustMe: 'I produce SSP-supporting inputs grounded in actual implementation and governance evidence.',
    experienceBackup: [
      'Created control narratives and evidence structures in readiness work.',
      'Connected policy intent to technical and operational implementation detail.',
      'Focused documentation on audit-defensible and maintainable control stories.',
    ],
  },
  'Modular Tool-Use': {
    whyImportant: 'Modular tool-use keeps AI systems composable, testable, and safe by separating capabilities into controlled components.',
    whyTrustMe: 'I design modular workflows with explicit boundaries to reduce failure propagation and improve verification.',
    experienceBackup: [
      'Built local-first agent systems with controlled orchestration patterns.',
      'Applied guardrails and secure defaults to automation workflows.',
      'Delivered auditable execution paths across multi-step task pipelines.',
    ],
  },
  'Vision/OCR': {
    whyImportant: 'Vision/OCR expands automation by extracting usable data from documents, screenshots, and evidence artifacts.',
    whyTrustMe: 'I apply it where evidence capture and review speed matter in compliance and security operations.',
    experienceBackup: [
      'Used automation design patterns for evidence-focused workflow execution.',
      'Mapped extracted outputs into governance and reporting pipelines.',
      'Prioritized traceability and validation in data handling steps.',
    ],
  },
  'FIPS 199': {
    whyImportant: 'FIPS 199 categorization sets system impact levels that drive baseline control rigor and risk decisions.',
    whyTrustMe: 'I use categorization logic to anchor control selection and remediation priorities in governance work.',
    experienceBackup: [
      'Executed framework-aligned risk assessments with structured impact thinking.',
      'Mapped control effort to risk criticality and system context.',
      'Produced governance artifacts that reflect defensible prioritization.',
    ],
  },
  'SSP Documentation': {
    whyImportant: 'Strong SSP documentation proves that controls are actually implemented and operable, not just planned.',
    whyTrustMe: 'I write documentation that links policy, implementation evidence, and operational accountability.',
    experienceBackup: [
      'Produced control narratives and supporting evidence structures.',
      'Built repeatable documentation templates for governance consistency.',
      'Aligned documentation outputs to readiness and audit expectations.',
    ],
  },
  'Control Gap Analysis': {
    whyImportant: 'Control gap analysis identifies exactly where risk exposure exists and where remediation investment should go first.',
    whyTrustMe: 'I run gap analysis with clear scoring and treatment plans that enable practical execution.',
    experienceBackup: [
      'Executed NIST-aligned assessments and identified control deficiencies.',
      'Produced remediation roadmaps tied to measurable outcomes.',
      'Converted findings into governance-ready action packages.',
    ],
  },
  'Conditional Access': {
    whyImportant: 'Conditional Access enforces context-aware access decisions that reduce identity compromise risk.',
    whyTrustMe: 'I have implemented access governance controls that combine policy, identity context, and least privilege.',
    experienceBackup: [
      'Applied Entra ID governance with access control guardrails.',
      'Integrated identity controls with privileged access strategy.',
      'Built practical access review and enforcement workflows.',
    ],
  },
};

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
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    const githubProfile = data.contact.github.replace(/\/$/, '');
    const username = githubProfile.split('/').pop();
    if (!username) {
      return;
    }

    const controller = new AbortController();

    const loadRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          return;
        }

        const repos = (await response.json()) as GitHubRepo[];
        const filtered = repos.filter((repo) => repo.name.toLowerCase() !== username.toLowerCase());
        setGithubRepos(filtered);
      } catch {
        setGithubRepos([]);
      }
    };

    loadRepos();

    return () => controller.abort();
  }, [data.contact.github]);

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

  const activeSkillInsight = activeSkill ? SKILL_INSIGHTS[activeSkill.title] : null;
  const activeCertInsight = activeCert ? CERT_INSIGHTS[activeCert.name] : null;
  const activeToolInsight = activeInfo ? TOOL_INSIGHTS[activeInfo] : null;

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
          <a href="#github">GitHub</a>
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
              src="/portfolio/headshot.jpg"
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

      <section className="repo-archive" id="github">
        <p className="section-kicker">GitHub</p>
        <h2>Full Repository Archive.</h2>
        <p className="archive-copy">
          Live sync of public repositories so the portfolio reflects current GitHub work, including newest projects as they ship.
        </p>

        <div className="repo-grid">
          {githubRepos.map((repo) => (
            <a key={repo.id} className="repo-card" href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <p className="repo-name">{repo.name}</p>
              <p className="repo-desc">{repo.description ?? 'Security, GRC, or automation-focused repository in active portfolio rotation.'}</p>
              <div className="repo-meta">
                <span>{repo.language ?? 'Multi-stack'}</span>
                <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                <span>★ {repo.stargazers_count}</span>
              </div>
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
            {activeSkillInsight ? (
              <div className="modal-detail-stack">
                <div className="detail-block">
                  <p className="detail-title">Industry Application</p>
                  <p>{activeSkillInsight.industryApplication}</p>
                </div>
                <div className="detail-block">
                  <p className="detail-title">Business Value</p>
                  <p>{activeSkillInsight.businessValue}</p>
                </div>
                <div className="detail-block">
                  <p className="detail-title">Typical Deliverables</p>
                  <ul>
                    {activeSkillInsight.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
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
            {activeCertInsight ? (
              <div className="modal-detail-stack">
                <div className="detail-block">
                  <p className="detail-title">Focus Area</p>
                  <p>{activeCertInsight.focusArea}</p>
                </div>
                <div className="detail-block">
                  <p className="detail-title">Industry Application</p>
                  <p>{activeCertInsight.industryApplication}</p>
                </div>
                <div className="detail-block">
                  <p className="detail-title">Practical Value</p>
                  <p>{activeCertInsight.practicalValue}</p>
                </div>
              </div>
            ) : null}
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
            {activeToolInsight ? (
              <div className="modal-detail-stack">
                <div className="detail-block">
                  <p className="detail-title">Why This Is Important</p>
                  <p>{activeToolInsight.whyImportant}</p>
                </div>
                <div className="detail-block">
                  <p className="detail-title">Why Trust My Skills</p>
                  <p>{activeToolInsight.whyTrustMe}</p>
                </div>
                <div className="detail-block">
                  <p className="detail-title">Experience Backup</p>
                  <ul>
                    {activeToolInsight.experienceBackup.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <p>
                {activeInfo} supports measurable, repeatable security delivery, and I apply it through hands-on projects,
                governance workflows, and defensible implementation patterns.
              </p>
            )}
          </article>
        </div>
      )}
    </main>
  );
}