'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

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
}

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
}

function Hero({ scrollY }: { scrollY: motion.MotionValue<number> }) {
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section 
      style={{ y, opacity }}
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F17] via-[#0B1F17] to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="z-10 text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-40 h-40 mx-auto mb-8 rounded-full border-4 border-[#2D6A4F] overflow-hidden bg-[#112D24]"
        >
          <img src="/ugo_logo.png" alt="UgoAI" className="w-full h-full object-cover" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-[#E8F5EE] mb-4"
        >
          UgoAI
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-[#95D5B2] mb-6 font-medium"
        >
          Fully Local Autonomous AI Agent
        </motion.p>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-[#8AB49A] max-w-2xl mx-auto mb-8"
        >
          Think. Plan. Execute. — An autonomous AI agent that runs entirely locally, 
          controls your computer, and gets smarter with every task.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="https://github.com/ijeziermf/UgoAI"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#2D6A4F] hover:bg-[#3A8A67] text-white font-semibold rounded-full transition"
          >
            View on GitHub
          </motion.a>
          
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-[#2D6A4F] text-[#95D5B2] hover:bg-[#112D24] font-semibold rounded-full transition"
          >
            Explore Features
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-[#2D6A4F] flex justify-center pt-2"
        >
          <motion.div className="w-1 h-2 bg-[#95D5B2] rounded-full" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

function FeatureCard({ title, description, icon, delay }: { title: string; description: string; icon: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="p-8 rounded-2xl bg-[#112D24] border border-[#1E4535] hover:border-[#2D6A4F] hover:bg-[#162F23] transition-all group"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#E8F5EE] mb-2 group-hover:text-[#95D5B2] transition">{title}</h3>
      <p className="text-[#8AB49A]">{description}</p>
    </motion.div>
  );
}

function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    { title: '100% Local', description: 'All models run through Ollama — no cloud APIs, no data leaves your machine.', icon: '🔒' },
    { title: 'Smart Routing', description: 'Automatically picks the right model: fast for simple tasks, deep reasoning for complex goals.', icon: '🧠' },
    { title: 'Computer Control', description: 'Vision-powered navigation — sees your screen, controls mouse & keyboard to automate any GUI.', icon: '🖱️' },
    { title: 'Self-Improving', description: 'Proposes, generates, tests and registers new tools at runtime. Gets smarter over time.', icon: '📈' },
    { title: 'Browser Automation', description: 'Playwright-powered web browsing with CAPTCHA resilience and auto-fallback.', icon: '🌐' },
    { title: 'Memory That Learns', description: 'Extracts facts, preferences and skills into SQLite. Never forgets.', icon: '💾' },
  ];

  return (
    <section id="features" className="py-32 px-4 bg-[#0B1F17]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl md:text-5xl font-bold text-center text-[#E8F5EE] mb-4"
        >
          Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center text-[#8AB49A] text-lg mb-16 max-w-2xl mx-auto"
        >
          Everything you need for autonomous AI assistance — completely offline.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const techs = ['Python', 'Ollama', 'Playwright', 'SQLite', 'FastAPI', 'TailwindCSS', 'PyAutoGUI', 'LLMs'];

  return (
    <section className="py-32 px-4 bg-[#0a1510]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-3xl font-bold text-[#E8F5EE] mb-8"
        >
          Built With
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.1 * i }}
              className="px-4 py-2 rounded-full bg-[#112D24] border border-[#1E4535] text-[#95D5B2]"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects({ repos }: { repos: GitHubRepo[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-32 px-4 bg-[#0B1F17]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold text-center text-[#E8F5EE] mb-4"
        >
          Other Projects
        </motion.h2>
        <p className="text-center text-[#8AB49A] mb-16">A collection of security and governance work.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.slice(0, 6).map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="block p-6 rounded-2xl bg-[#112D24] border border-[#1E4535] hover:border-[#D4AF37] hover:bg-[#162F23] transition-all group"
            >
              <h3 className="text-lg font-semibold text-[#E8F5EE] group-hover:text-[#D4AF37] transition">{repo.name}</h3>
              <p className="text-sm text-[#8AB49A] mt-2 line-clamp-2">{repo.description || 'No description'}</p>
              <div className="flex items-center gap-3 mt-4 text-xs text-[#506860]">
                {repo.language && <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#95D5B2]" />{repo.language}</span>}
                <span>⭐ {repo.stargazers_count}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function About({ user }: { user: GitHubUser }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-32 px-4 bg-[#0a1510]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-4xl font-bold text-[#E8F5EE] mb-8"
        >
          About Me
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <img src={user.avatar_url} alt={user.name || user.login} className="w-24 h-24 rounded-full border-4 border-[#2D6A4F] mb-6" />
          <h3 className="text-xl font-semibold text-[#E8F5EE] mb-2">{user.name}</h3>
          <p className="text-[#8AB49A] mb-4">@{user.login}</p>
          <p className="text-[#E8F5EE] max-w-lg">{user.bio}</p>
          
          <div className="flex gap-8 mt-8">
            <div><div className="text-2xl font-bold text-[#95D5B2]">{user.public_repos}</div><div className="text-sm text-[#506860]">Repositories</div></div>
            <div><div className="text-2xl font-bold text-[#95D5B2]">{user.followers}</div><div className="text-sm text-[#506860]">Followers</div></div>
            <div><div className="text-2xl font-bold text-[#95D5B2]">{user.following}</div><div className="text-sm text-[#506860]">Following</div></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-4 bg-[#0a1510] border-t border-[#1E4535]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#506860] text-sm">© {new Date().getFullYear()} Ifeanyi Ijezie. Built with UgoAI and Next.js.</p>
        <div className="flex justify-center gap-6 mt-4">
          <a href="https://github.com/ijeziermf" className="text-[#8AB49A] hover:text-[#95D5B2] transition">GitHub</a>
          <a href="https://github.com/ijeziermf/UgoAI" className="text-[#8AB49A] hover:text-[#95D5B2] transition">UgoAI</a>
        </div>
      </div>
    </footer>
  );
}

export default function HomeClient({ userData, repoData }: { userData: GitHubUser; repoData: GitHubRepo[] }) {
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30 });

  return (
    <main className="bg-[#0B1F17] min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0B1F17]/80 backdrop-blur-md border-b border-[#1E4535]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-bold text-[#95D5B2]">UgoAI</a>
          <div className="flex gap-6">
            <a href="#features" className="text-[#8AB49A] hover:text-[#95D5B2] transition">Features</a>
            <a href="https://github.com/ijeziermf/UgoAI" className="text-[#8AB49A] hover:text-[#95D5B2] transition">GitHub</a>
          </div>
        </div>
      </nav>

      <Hero scrollY={smoothScrollY} />
      <Features />
      <TechStack />
      <Projects repos={repoData} />
      <About user={userData} />
      <Footer />
    </main>
  );
}