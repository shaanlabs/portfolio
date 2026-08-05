export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  fork: boolean;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface FeaturedEntry {
  repo: string;
  demoUrl: string | null;
  pin: number;
}

export interface StaticProject {
  name: string;
  description: string;
  language: string;
  stack: string[];
  isStatic: true;
}

export interface FeaturedConfig {
  featured: FeaturedEntry[];
  staticProjects: StaticProject[];
}

export interface ProcessedRepo extends GitHubRepo {
  isPinned: boolean;
  pinOrder: number;
  demoUrl: string | null;
  readmeExcerpt?: string;
}
