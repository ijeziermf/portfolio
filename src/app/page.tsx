'use client';

import PortfolioClient from '@/components/Portfolio';
import { useEffect, useState } from 'react';

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

export default function Page() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repoData, setRepoData] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getGitHubUser(),
      getGitHubRepos()
    ]).then(([user, repos]) => {
      setUserData(user);
      setRepoData(repos);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1F17] flex items-center justify-center">
        <div className="text-[#95D5B2] text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#0B1F17] flex items-center justify-center">
        <div className="text-[#95D5B2] text-xl">Failed to load data</div>
      </div>
    );
  }

  return <PortfolioClient userData={userData} repoData={repoData} />;
}