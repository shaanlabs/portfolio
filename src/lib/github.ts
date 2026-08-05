import { GitHubRepo, ProcessedRepo, FeaturedConfig } from './types';
import featuredData from '@/data/featured.json';

const GITHUB_USERNAME = 'shaanlabs';
const GITHUB_API_BASE = 'https://api.github.com';

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export async function fetchAllRepos(): Promise<GitHubRepo[]> {
  const allRepos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const res = await fetch(
        `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${perPage}&page=${page}`,
        {
          headers: getHeaders(),
          next: { revalidate: 3600 },
        }
      );

      if (!res.ok) {
        console.error(`GitHub API error: ${res.status} ${res.statusText}`);
        break;
      }

      const repos: GitHubRepo[] = await res.json();
      if (repos.length === 0) break;

      allRepos.push(...repos);
      if (repos.length < perPage) break;
      page++;
    }
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
  }

  return allRepos;
}

export async function fetchRepoReadme(repoSlug: string): Promise<string> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoSlug}/readme`,
      {
        headers: {
          ...getHeaders(),
          Accept: 'application/vnd.github.v3.raw',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return '';

    const content = await res.text();
    // Extract first paragraph, strip markdown formatting, truncate to ~40 words
    const lines = content.split('\n').filter((l) => l.trim() && !l.startsWith('#') && !l.startsWith('!') && !l.startsWith('---'));
    const firstParagraph = lines.slice(0, 3).join(' ');
    const words = firstParagraph.split(/\s+/).slice(0, 40);
    return words.join(' ') + (words.length >= 40 ? '...' : '');
  } catch {
    return '';
  }
}

export async function fetchRepoTopics(repoSlug: string): Promise<string[]> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repoSlug}/topics`,
      {
        headers: {
          ...getHeaders(),
          Accept: 'application/vnd.github.mercy-preview+json',
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return [];
    const data = await res.json();
    return data.names || [];
  } catch {
    return [];
  }
}

export async function getProcessedRepos(): Promise<{
  pinned: ProcessedRepo[];
  other: ProcessedRepo[];
  forked: ProcessedRepo[];
}> {
  const config = featuredData as FeaturedConfig;
  const allRepos = await fetchAllRepos();

  const pinnedMap = new Map(
    config.featured.map((f) => [f.repo.toLowerCase(), f])
  );

  const pinned: ProcessedRepo[] = [];
  const other: ProcessedRepo[] = [];
  const forked: ProcessedRepo[] = [];

  for (const repo of allRepos) {
    const featuredEntry = pinnedMap.get(repo.name.toLowerCase());

    const processed: ProcessedRepo = {
      ...repo,
      isPinned: !!featuredEntry,
      pinOrder: featuredEntry?.pin ?? 999,
      demoUrl: featuredEntry?.demoUrl ?? repo.homepage ?? null,
    };

    if (repo.fork) {
      forked.push(processed);
    } else if (featuredEntry) {
      pinned.push(processed);
    } else {
      other.push(processed);
    }
  }

  // Sort pinned by pin order
  pinned.sort((a, b) => a.pinOrder - b.pinOrder);
  // Sort other by updated_at descending
  other.sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return { pinned, other, forked };
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
}

export async function fetchGitHubStats(): Promise<GitHubStats> {
  const allRepos = await fetchAllRepos();
  
  return allRepos.reduce(
    (acc, repo) => ({
      totalRepos: acc.totalRepos + 1,
      totalStars: acc.totalStars + repo.stargazers_count,
      totalForks: acc.totalForks + repo.forks_count,
    }),
    { totalRepos: 0, totalStars: 0, totalForks: 0 }
  );
}

export interface LanguageStat {
  name: string;
  count: number;
  color: string;
  percentage: number;
}

export async function fetchLanguageBreakdown(): Promise<LanguageStat[]> {
  const allRepos = await fetchAllRepos();
  const langCounts: Record<string, number> = {};
  let totalWithLang = 0;

  for (const repo of allRepos) {
    if (repo.language && !repo.fork) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      totalWithLang++;
    }
  }

  const sorted: LanguageStat[] = Object.entries(langCounts)
    .map(([name, count]) => ({
      name,
      count,
      color: getLanguageColor(name),
      percentage: Math.round((count / totalWithLang) * 100),
    }))
    .sort((a, b) => b.count - a.count);

  return sorted;
}

export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    name: string;
    url: string;
  };
}

export async function fetchRecentActivity(): Promise<GitHubEvent[]> {
  try {
    const res = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Language color mapping for GitHub-style language indicators
export const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  Kotlin: '#A97BFF',
  Swift: '#F05138',
  Vue: '#41b883',
  SCSS: '#c6538c',
};

export function getLanguageColor(language: string | null): string {
  if (!language) return '#8b98a5';
  return languageColors[language] || '#8b98a5';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  const years = Math.floor(diffDays / 365);
  return `${years} year${years > 1 ? 's' : ''} ago`;
}
