'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  html_url: string;
  twitter_username: string | null;
  company: string | null;
  blog: string;
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  readme: string | null;
  forks_count: number;
  open_issues_count: number;
  default_branch: string;
  pushed_at: string;
}

const languageColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Go: '#00ADD8',
  Rust: '#dea584',
  Java: '#b07219',
  Jupyter: '#DA5B0B',
  Vue: '#41B883',
};

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
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <motion.a 
          href="#"
          className="text-2xl font-bold text-[#E8F5EE] tracking-tight"
          whileHover={{ scale: 1.02 }}
        >
          <span className="text-[#95D5B2]">I</span>F
        </motion.a>
        
        <div className="flex items-center gap-8">
          {['Projects', 'About', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={item === 'Projects' ? '#projects' : item === 'About' ? '#about' : '#contact'}
              className="text-sm text-[#8AB49A] hover:text-[#E8F5EE] transition-colors relative"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -2 }}
            >
              {item}
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-px bg-[#95D5B2] origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

function Hero({ scrollY }: { scrollY: MotionValue<number> }) {
  const y = useTransform(scrollY, [0, 800], [0, 250]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.95]);

  return (
    <motion.section 
      style={{ y, opacity, scale }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0B1F17]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(45,106,79,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(149,213,178,0.1) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(45,106,79,0.08) 0%, transparent 60%)
          `,
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2D6A4F 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.4
        }} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 text-center px-4 max-w-3xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-36 h-36 mx-auto mb-10"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#2D6A4F] to-[#95D5B2] opacity-20 blur-xl" />
          <div className="relative w-full h-full rounded-3xl border border-[#2D6A4F]/30 overflow-hidden bg-[#112D24] backdrop-blur">
            <img src="/ugo_logo.png" alt="UgoAI" className="w-full h-full object-cover" />
          </div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#95D5B2] text-sm font-medium tracking-[0.2em] uppercase mb-4"
        >
          Governance & Risk Management
        </motion.p>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-[#E8F5EE] mb-6 tracking-tight"
        >
          Ifeanyi <span className="text-[#95D5B2]">Ijezie</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-[#8AB49A] mb-8 font-light"
        >
          MBA Candidate • Forming security risk into clear business decisions
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="https://github.com/ijeziermf"
            target="_blank"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(45,106,79,0.3)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-gradient-to-r from-[#2D6A4F] to-[#3A8A67] text-white font-semibold rounded-full shadow-lg shadow-[#2D6A4F]/25 transition-all"
          >
            View GitHub
          </motion.a>
          
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(17,45,36,0.8)' }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 border border-[#2D6A4F]/50 text-[#95D5B2] font-semibold rounded-full backdrop-blur-sm transition-all"
          >
            Explore Work
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-14 rounded-full border-2 border-[#2D6A4F]/40 flex justify-center pt-3"
        >
          <motion.div className="w-1.5 h-3 bg-[#95D5B2] rounded-full opacity-60" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function About({ user }: { user: GitHubUser }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-32 px-4 bg-[#0a1510] relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(45,106,79,0.1) 0%, transparent 50%)',
      }} />
      
      <div className="max-w-5xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-[#E8F5EE] mb-16"
        >
          About
        </motion.h2>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2D6A4F] to-[#95D5B2] opacity-20 blur-2xl" />
              <div className="relative w-44 h-44 rounded-2xl border-2 border-[#2D6A4F]/30 overflow-hidden">
                <img 
                  src={user.avatar_url} 
                  alt={user.name || user.login}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex-1"
          >
            <h3 className="text-2xl font-semibold text-[#E8F5EE] mb-4">{user.name}</h3>
            <p className="text-[#8AB49A] mb-6 text-lg leading-relaxed">{user.bio}</p>
            
            <div className="flex gap-12">
              {[
                { label: 'Repositories', value: user.public_repos },
                { label: 'Followers', value: user.followers },
                { label: 'Following', value: user.following }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="text-3xl font-bold text-[#95D5B2]">{stat.value}</div>
                  <div className="text-sm text-[#506860]">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-30px' });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="block relative p-8 rounded-3xl bg-gradient-to-br from-[#112D24] to-[#0B1F17] border border-[#1E4535] hover:border-[#95D5B2]/50 transition-all duration-500 group overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#2D6A4F]/20 to-transparent rounded-bl-full transition-all duration-500 group-hover:scale-150" />
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#E8F5EE] group-hover:text-[#95D5B2] transition-colors">
            {repo.name}
          </h3>
          {repo.language && (
            <span 
              className="flex items-center gap-2 text-xs px-3 py-1 rounded-full bg-[#1E4535]/50 text-[#95D5B2]"
            >
              <span 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: languageColors[repo.language] || '#95D5B2' }} 
              />
              {repo.language}
            </span>
          )}
        </div>
        
        <p className="text-[#8AB49A] mb-4 line-clamp-2">
          {repo.description || 'No description available'}
        </p>
        
        <motion.div
          animate={{ height: hovered && repo.readme ? 'auto' : 0, opacity: hovered && repo.readme ? 1 : 0 }}
          className="overflow-hidden"
        >
          {repo.readme && (
            <div className="text-xs text-[#506860] mb-4 font-mono bg-[#0a1510]/80 p-4 rounded-xl leading-relaxed">
              {repo.readme}
            </div>
          )}
        </motion.div>
        
        <div className="flex items-center gap-4 text-xs text-[#506860]">
          <span className="flex items-center gap-1">
            ⭐ {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1">
            ⑂ {repo.forks_count}
          </span>
          {repo.topics?.slice(0, 2).map(topic => (
            <span key={topic} className="px-2 py-1 bg-[#1E4535]/50 rounded-full text-[#95D5B2]/80">
              {topic}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

function Projects({ repos }: { repos: GitHubRepo[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="projects" ref={ref} className="py-32 px-4 bg-[#0B1F17] relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(149,213,178,0.05) 0%, transparent 30%),
          radial-gradient(circle at 90% 80%, rgba(45,106,79,0.08) 0%, transparent 30%)
        `,
      }} />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-bold text-center text-[#E8F5EE] mb-4"
        >
          Selected Work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center text-[#8AB49A] mb-16"
        >
          A collection of projects exploring security, automation, and AI
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.map((repo, i) => (
            <ProjectCard key={repo.name} repo={repo} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer id="contact" ref={ref} className="py-20 px-4 bg-[#0a1510] border-t border-[#1E4535]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-2xl font-semibold text-[#E8F5EE] mb-4"
        >
          Let's Connect
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="text-[#8AB49A] mb-8"
        >
          Interested in collaboration or have questions?
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6"
        >
          <a href="https://github.com/ijeziermf" className="text-[#8AB49A] hover:text-[#95D5B2] transition-colors">GitHub</a>
          <a href="https://github.com/ijeziermf/UgoAI" className="text-[#8AB49A] hover:text-[#95D5B2] transition-colors">UgoAI</a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-sm text-[#506860] mt-12"
        >
          © {new Date().getFullYear()} Ifeanyi Ijezie
        </motion.p>
      </div>
    </footer>
  );
}

export default function Portfolio({ userData, repoData }: { userData: GitHubUser; repoData: GitHubRepo[] }) {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 80, damping: 25 });

  return (
    <main className="bg-[#0B1F17] min-h-screen text-[#E8F5EE] font-sans selection:bg-[#2D6A4F] selection:text-white">
      <Nav />
      <Hero scrollY={smoothScrollY} />
      <About user={userData} />
      <Projects repos={repoData} />
      <Footer />
    </main>
  );
}