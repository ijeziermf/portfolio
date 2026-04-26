import PortfolioClient from '@/components/Portfolio';

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

async function getGitHubUser(): Promise<GitHubUser> {
  const res = await fetch('https://api.github.com/users/ijeziermf', { 
    cache: 'no-store',
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

async function getGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch('https://api.github.com/users/ijeziermf/repos?sort=updated&per_page=100', { 
    cache: 'no-store',
    next: { revalidate: 3600 }
  });
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}

export default async function Page() {
  const [userData, repoData] = await Promise.all([
    getGitHubUser(),
    getGitHubRepos()
  ]);

  return <PortfolioClient userData={userData} repoData={repoData} />;
}