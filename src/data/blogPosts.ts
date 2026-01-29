export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'forex' | 'psychology' | 'risk' | 'analysis' | 'education';
  categoryLabel: string;
  featuredImage: string;
  author: string;
  publishDate: string;
  readingTime: number;
  featured?: boolean;
}

export const categories = [
  { id: 'all', label: 'All Posts' },
  { id: 'forex', label: 'Forex Markets' },
  { id: 'psychology', label: 'Trading Psychology' },
  { id: 'risk', label: 'Risk Management' },
  { id: 'analysis', label: 'Technical Analysis' },
  { id: 'education', label: 'Education' },
] as const;
