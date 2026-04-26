'use client';

import Portfolio from '@/components/Portfolio';
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

export default function Page() {
  const user: GitHubUser = userData.user as GitHubUser;
  const repos: GitHubRepo[] = userData.repos as GitHubRepo[];

  return <Portfolio userData={user} repoData={repos} />;
}