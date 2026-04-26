'use client';

import PortfolioClient from '@/components/Portfolio';
import userData from '@/app/data.json';

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
  const user: GitHubUser = userData.user as GitHubUser;
  const repos: GitHubRepo[] = userData.repos as GitHubRepo[];

  return <PortfolioClient userData={user} repoData={repos} />;
}