'use client';

import { useRef } from 'react';
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
};

function Hero({ scrollY }: { scrollY: MotionValue<number> }) {
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <motion.section 
      style={{ y, opacity }}
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F17] via-[#0B1F17] to-[#0a1510]">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #2D6A4F 1px, transparent 1px),
                       radial-gradient(circle at 75% 75%, #95D5B2 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-32 h-32 mx-auto mb-8 rounded-2xl border-4 border-[#2D6A4F] overflow-hidden bg-[#112D24] shadow-2xl shadow-[#2D6A4F]/20"
        >
          <img src="/ugo_logo.png" alt="UgoAI" className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-[#E8F5EE] mb-4 tracking-tight"
        >
          Ifeanyi <span className="text-[#95D5B2]">Ijezie</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-[#95D5B2] mb-4 font-medium"
        >
          Governance & Risk Management | MBA Candidate
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-[#8AB49A] max-w-xl mx-auto mb-8"
        >
          Forming security risk into clear business decisions
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
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(45,106,79,0.5)' }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#2D6A4F] hover:bg-[#3A8A67] text-white font-semibold rounded-full transition-all"
          >
            GitHub
          </motion.a>
          
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-[#2D6A4F] text-[#95D5B2] hover:bg-[#112D24] font-semibold rounded-full transition-all"
          >
            View Projects
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#2D6A4F] flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-[#95D5B2] rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-[#95D5B2]">{value}</div>
      <div className="text-sm text-[#506860]">{label}</div>
    </div>
  );
}

function About({ user }: { user: GitHubUser }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 px-4 bg-[#0a1510]">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold text-center text-[#E8F5EE] mb-12"
        >
          About Me
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-12"
        >
          <img 
            src={user.avatar_url} 
            alt={user.name || user.login}
            className="w-32 h-32 rounded-2xl border-4 border-[#2D6A4F]" 
          />
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-[#E8F5EE] mb-2">{user.name}</h3>
            <p className="text-[#8AB49A] mb-2">@{user.login}</p>
            <p className="text-[#E8F5EE]">{user.bio}</p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-8 md:gap-16"
        >
          <StatCard label="Repositories" value={user.public_repos} />
          <StatCard label="Followers" value={user.followers} />
          <StatCard label="Following" value={user.following} />
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.a
      ref={ref}
      href={repo.html_url}
      target="_blank"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="block p-6 rounded-2xl bg-[#112D24] border border-[#1E4535] hover:border-[#95D5B2] hover:bg-[#162F23] transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-[#E8F5EE] group-hover:text-[#95D5B2] transition">{repo.name}</h3>
        <div className="flex items-center gap-2 text-sm text-[#506860]">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: languageColors[repo.language] || '#95D5B2' }} 
              />
              {repo.language}
            </span>
          )}
        </div>
      </div>
      
      <p className="text-[#8AB49A] text-sm mb-4 line-clamp-3">
        {repo.description || 'No description available'}
      </p>
      
      {repo.readme && (
        <div className="text-xs text-[#506860] mb-4 line-clamp-4 font-mono bg-[#0a1510] p-3 rounded-lg">
          {repo.readme}
        </div>
      )}
      
      <div className="flex items-center gap-4 text-xs text-[#506860]">
        <span>⭐ {repo.stargazers_count}</span>
        <span>⑂ {repo.forks_count}</span>
        {repo.topics?.slice(0, 3).map(topic => (
          <span key={topic} className="px-2 py-1 bg-[#1E4535] rounded-full text-[#95D5B2]">
            {topic}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function Projects({ repos }: { repos: GitHubRepo[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="projects" className="py-24 px-4 bg-[#0B1F17]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-bold text-center text-[#E8F5EE] mb-4"
        >
          Projects
        </motion.h2>
        <p className="text-center text-[#8AB49A] mb-12">All repositories with full READMEs</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <footer ref={ref} className="py-16 px-4 bg-[#0a1510] border-t border-[#1E4535]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-[#506860]"
        >
          © {new Date().getFullYear()} Ifeanyi Ijezie. Built with Next.js
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-6 mt-4"
        >
          <a href="https://github.com/ijeziermf" className="text-[#8AB49A] hover:text-[#95D5B2] transition">GitHub</a>
          <a href="https://github.com/ijeziermf/UgoAI" className="text-[#8AB49A] hover:text-[#95D5B2] transition">UgoAI</a>
        </motion.div>
      </div>
    </footer>
  );
}

export default function Portfolio({ userData, repoData }: { userData: GitHubUser; repoData: GitHubRepo[] }) {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  return (
    <main className="bg-[#0B1F17] min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1F17]/90 backdrop-blur-md border-b border-[#1E4535]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-[#95D5B2]">IF</a>
          <div className="flex gap-6">
            <a href="#projects" className="text-[#8AB49A] hover:text-[#95D5B2] transition">Projects</a>
            <a href="https://github.com/ijeziermf" className="text-[#8AB49A] hover:text-[#95D5B2] transition">GitHub</a>
          </div>
        </div>
      </nav>

      <Hero scrollY={smoothScrollY} />
      <About user={userData} />
      <Projects repos={repoData} />
      <Footer />
    </main>
  );
}