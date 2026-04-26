'use client';

import PortfolioClient from '@/components/Portfolio';
import { useEffect, useState } from 'react';
import data from '@/app/data.json';

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

export default function Page() {
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repoData, setRepoData] = useState<GitHubRepo[]>([]);

  useEffect(() => {
    if (data?.user) {
      setUserData(data.user);
      setRepoData(data.repos || []);
    }
  }, []);

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#0B1F17] flex items-center justify-center">
        <div className="text-[#95D5B2] text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return <PortfolioClient userData={userData} repoData={repoData} />;
}