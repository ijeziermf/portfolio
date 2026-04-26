interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  location: string;
  hireable: boolean;
  followers: number;
  following: number;
  public_repos: number;
  avatar_url: string;
  html_url: string;
}

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
}

async function getGitHubUser(): Promise<GitHubUser> {
  const res = await fetch('https://api.github.com/users/ijeziermf', { cache: 'no-store' });
  return res.json();
}

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch('https://api.github.com/users/ijeziermf/repos?sort=updated&per_page=100', { cache: 'no-store' });
  return res.json();
}

export default async function Home() {
  const user = await getGitHubUser();
  const repos = await getGitHubRepos();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <img
          src={user.avatar_url}
          alt={user.name || user.login}
          className="w-32 h-32 rounded-full border-4 border-cyan-400 mb-6"
        />
        <h1 className="text-4xl font-bold mb-2">{user.name || user.login}</h1>
        <p className="text-xl text-cyan-300 mb-4">@{user.login}</p>
        {user.bio && <p className="text-lg text-slate-300 max-w-2xl">{user.bio}</p>}
        
        <div className="flex gap-8 mt-6 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400">{user.public_repos}</div>
            <div className="text-sm text-slate-400">Repositories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">{user.followers}</div>
            <div className="text-sm text-slate-400">Followers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyan-400">{user.following}</div>
            <div className="text-sm text-slate-400">Following</div>
          </div>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold rounded-lg transition"
        >
          View GitHub Profile
        </a>
      </section>

      {/* Projects Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-slate-800 rounded-lg hover:bg-slate-700 transition border border-slate-700 hover:border-cyan-400"
            >
              <h3 className="text-lg font-semibold text-cyan-300 mb-2">{repo.name}</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                {repo.description || 'No description'}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                {repo.language && <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  {repo.language}
                </span>}
                <span>⭐ {repo.stargazers_count}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-500 text-sm">
        <p>Built with Next.js • Deployed on Vercel</p>
      </footer>
    </main>
  );
}