'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

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

function useScrolled(threshold: number = 50) {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  
  return scrolled;
}

function Nav() {
  const scrolled = useScrolled(50);
  
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0B1F17]/95 backdrop-blur-xl border-b border-[#2D6A4F]/20' : 'bg-transparent'
      }`}
    >
      <div className="px-8 lg:px-16 xl:px-24 py-5 flex items-center justify-between">
        <motion.a 
          href="#"
          className="text-xl font-bold text-[#E8F5EE] tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          Ifeanyi <span className="text-[#D4AF37]">Ijezie</span>
        </motion.a>
        
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Projects', 'About', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={item === 'Home' ? '#' : item === 'Projects' ? '#projects' : item === 'About' ? '#about' : '#contact'}
              className="text-sm text-[#8AB49A] hover:text-[#E8F5EE] transition-colors"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="px-4 py-2 border border-[#2D6A4F] text-[#95D5B2] text-sm font-medium rounded-lg hover:bg-[#2D6A4F]/20 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Resume
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex items-center relative">
      <div className="absolute inset-0 gradient-mesh z-0" />
      
      <div className="relative z-10 px-8 lg:px-16 xl:px-24 py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 xl:col-span-8 text-center lg:text-left">
            <div className="mb-6">
              <p className="text-[#D4AF37] text-sm font-mono tracking-wider uppercase">
                SECURITY AUTOMATION ENGINEER · GRC · DEVOPS
              </p>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#E8F5EE] mb-6 tracking-tight leading-tight">
              Ifeanyi<br />Ijezie
            </h1>
            
            <p className="text-xl md:text-2xl text-[#8AB49A] font-light mb-10 max-w-2xl mx-auto lg:mx-0">
              Architecting autonomous security platforms and automating compliance workflows.<br />
              <span className="text-[#95D5B2]">CompTIA Security+ | Microsoft SC-900</span>
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="https://www.linkedin.com/in/ifeanyi-ijezie/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-[#2D6A4F] to-[#3A8A67] text-white font-semibold rounded-lg shadow-lg shadow-[#2D6A4F]/25 hover:shadow-[#2D6A4F]/40 hover:scale-105 transition-all"
              >
                LinkedIn
              </a>
              
              <a
                href="#projects"
                className="px-8 py-4 border border-[#2D6A4F] text-[#95D5B2] font-semibold rounded-lg hover:bg-[#2D6A4F]/20 hover:scale-105 transition-all"
              >
                View Projects
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#D4AF37]/30 to-[#2D6A4F]/30 opacity-40 blur-xl" />
              <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-3xl border-2 border-[#D4AF37]/40 overflow-hidden bg-[#112D24] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.15)] shadow-[0_0_80px_rgba(45,106,79,0.2)]">
                <img
                  src="https://avatars.githubusercontent.com/u/258281403?v=4"
                  alt="Ifeanyi Ijezie"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F17]/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <p className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">Security Automation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
        <div className="w-1 h-12 bg-gradient-to-b from-[#D4AF37] to-transparent rounded-full animate-pulse" />
      </div>
    </section>
  );
}

function Certifications({ certifications }: { certifications: Certification[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const earned = certifications.filter(c => c.status === 'earned');
  const pursuing = certifications.filter(c => c.status === 'pursuing');
  
  return (
    <section ref={ref} className="py-20 px-8 lg:px-16 xl:px-24 bg-[#0a1510]">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {earned.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="cert-card px-6 py-4 glass rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 transition-all duration-300"
            >
              <p className="text-[#E8F5EE] font-mono text-sm">{cert.name}</p>
              {cert.issuer && <p className="text-[#8AB49A] text-xs mt-1">{cert.issuer}</p>}
            </motion.div>
          ))}
        </motion.div>
        
        {pursuing.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <p className="text-[#95D5B2] text-sm font-medium">
              Pursuing: {pursuing.map(c => c.name).join(' | ')}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Competencies({ competencies, additionalSkills }: { competencies: Competency[]; additionalSkills: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section ref={ref} className="py-32 px-8 lg:px-16 xl:px-24 bg-[#0B1F17]">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#E8F5EE] mb-4">Expertise</h2>
          <p className="text-[#8AB49A] text-lg">Core competencies and technical skills</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {competencies.map((comp, i) => (
            <motion.div
              key={comp.title}
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group p-8 glass rounded-xl border-l-4 border-[#D4AF37]/60 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-lg hover:shadow-[#D4AF37]/10 text-center"
              whileHover={{ y: -4 }}
            >
              <h3 className="text-xl font-semibold text-[#E8F5EE] mb-3">{comp.title}</h3>
              <p className="text-[#8AB49A] mb-6 leading-relaxed text-sm">{comp.descriptor}</p>
              <div className="flex flex-wrap gap-2 pt-2 justify-center">
                {comp.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#1E4535]/60 text-[#95D5B2] text-xs rounded-full font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12"
        >
          <p className="text-[#95D5B2] text-sm font-medium">
            Also experienced in: {additionalSkills}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, featured }: { project: Project; index: number; featured?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.a
      ref={ref}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`block relative p-8 rounded-xl glass border border-[#1E4535] hover:border-[#D4AF37]/50 transition-all duration-500 group overflow-hidden text-center ${
        featured ? 'md:col-span-2 xl:col-span-3' : 'xl:col-span-1'
      }`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#2D6A4F]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          transform: hovered ? 'rotateX(2deg) rotateY(-2deg)' : 'none',
        }}
      />
      
      <div className="relative">
        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="px-3 py-1 bg-[#2D6A4F]/40 text-[#95D5B2] text-xs rounded-full font-mono">
            {project.category}
          </span>
          {featured && (
            <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] text-xs rounded-full font-mono">
              Featured
            </span>
          )}
        </div>
        
        <h3 className={`font-semibold text-[#E8F5EE] mb-3 group-hover:text-[#D4AF37] transition-colors ${
          featured ? 'text-2xl md:text-3xl' : 'text-xl'
        }`}>
          {project.name}
        </h3>
        
        <p className={`text-[#8AB49A] mb-6 leading-relaxed ${
          featured ? 'text-lg' : ''
        }`}>
          {project.summary}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#1E4535]/60 text-[#95D5B2] text-xs rounded-full font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -20 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-[#D4AF37] font-medium justify-center"
        >
          <span>View Project</span>
          <span className="text-lg">→</span>
        </motion.div>
      </div>
    </motion.a>
  );
}

function Projects({ projects }: { projects: Project[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const featured = projects.find(p => p.featured);
  const regular = projects.filter(p => !p.featured);
  
  return (
    <section id="projects" ref={ref} className="py-32 px-8 lg:px-16 xl:px-24 bg-[#0a1510]">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#E8F5EE] mb-4">Selected Work</h2>
          <p className="text-[#8AB49A] text-lg">Cybersecurity, GRC, and AI-driven automation</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featured && <ProjectCard project={featured} index={0} featured />}
          {regular.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <section id="about" ref={ref} className="py-32 px-8 lg:px-16 xl:px-24 bg-[#0B1F17]">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#E8F5EE] mb-4">About</h2>
        </motion.div>
        
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-24 rounded-full border-2 border-[#2D6A4F]/40 overflow-hidden mb-8"
          >
            <img
              src="https://avatars.githubusercontent.com/u/258281403?v=4"
              alt="Ifeanyi Ijezie"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-4xl"
          >
            <h3 className="text-2xl font-semibold text-[#E8F5EE] mb-6">Ifeanyi Ijezie</h3>
            
            <p className="text-[#8AB49A] text-lg leading-relaxed mb-6">
              Security Automation Engineer and Systems Designer with hands-on experience architecting autonomous security platforms, designing multi-model agent systems, and automating compliance workflows. Security+ and SC-900 certified with a proven track record building scalable, production-ready systems that reduce manual effort by 70%+ and improve operational reliability.
            </p>
            
            <p className="text-[#8AB49A] text-lg leading-relaxed mb-6">
              Previously: Intelligence Intern (Gannon University) | Information Security Analyst (Lids)
            </p>
            
            <p className="text-[#8AB49A] text-lg leading-relaxed mb-8">
              Currently pursuing CISM and CISSP certifications.
            </p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-[#95D5B2] font-medium">
              <p>Waldorf, MD | Open to Relocate</p>
              <p>BS, Cum Laude 3.57 GPA | Gannon University</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact({ contact }: { contact: Contact }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const links = [
    { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { label: 'LinkedIn', value: 'linkedin.com/in/ifeanyi-ijezie', href: contact.linkedin },
    { label: 'GitHub', value: 'github.com/ijeziermf', href: contact.github },
    { label: 'Discord', value: 'discord.gg/dwP8QQxAtK', href: contact.discord },
  ];
  
  return (
    <section id="contact" ref={ref} className="py-32 px-8 lg:px-16 xl:px-24 bg-[#0a1510]">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#E8F5EE] mb-4">Let&apos;s Connect</h2>
          <p className="text-[#8AB49A] text-lg">Open to cybersecurity, GRC, and DevOps opportunities</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group p-6 glass rounded-xl border border-[#1E4535] hover:border-[#D4AF37]/50 transition-all duration-300 text-center"
              whileHover={{ y: -4, scale: 1.02 }}
            >
              <p className="text-[#95D5B2] text-sm mb-1">{link.label}</p>
              <p className="text-[#E8F5EE] font-medium group-hover:text-[#D4AF37] transition-colors">
                {link.value}
              </p>
            </motion.a>
          ))}
        </div>
        
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-20 text-[#506860] text-sm"
        >
          <p>© 2026 Ifeanyi Ijezie · Built with Next.js</p>
        </motion.footer>
      </div>
    </section>
  );
}

export default function Portfolio({ data }: { data: Data }) {
  return (
    <main className="bg-[#0B1F17] min-h-screen text-[#E8F5EE] font-sans selection:bg-[#2D6A4F] selection:text-white">
      <Nav />
      <Hero />
      <Certifications certifications={data.certifications} />
      <Competencies competencies={data.competencies} additionalSkills={data.additionalSkills} />
      <Projects projects={data.projects} />
      <About />
      <Contact contact={data.contact} />
    </main>
  );
}