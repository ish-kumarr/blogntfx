import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Hash } from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';

const fetchPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.posts;
};

// Extract tags from blog post content and titles
const extractTags = (posts: BlogPost[]) => {
  const tagKeywords = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF',
    'Forex', 'Currency', 'Trading', 'Technical Analysis', 'Fundamental Analysis',
    'Risk Management', 'Psychology', 'Candlestick', 'Support', 'Resistance',
    'Trend', 'Breakout', 'Volatility', 'Leverage', 'Hedging',
    'Central Banks', 'Interest Rates', 'Economic Calendar', 'NFP', 'GDP',
    'Fibonacci', 'Moving Average', 'RSI', 'MACD', 'Bollinger Bands',
    'Stop Loss', 'Take Profit', 'Position Sizing', 'Drawdown', 'Pip'
  ];

  const tagCounts: Record<string, number> = {};

  posts.forEach(post => {
    const content = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
    tagKeywords.forEach(tag => {
      if (content.includes(tag.toLowerCase())) {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      }
    });
  });

  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([tag, count]) => ({ tag, count }));
};

const TagCloudSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-border shadow-sm animate-pulse">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-8 h-8 rounded-lg bg-muted" />
      <div className="h-6 w-32 bg-muted rounded" />
    </div>
    <div className="flex flex-wrap gap-2">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="h-8 w-24 bg-muted rounded-full" />
      ))}
    </div>
  </div>
);

const TagCloud = () => {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blogPostsForTags'],
    queryFn: fetchPosts,
  });

  const tags = useMemo(() => extractTags(posts), [posts]);

  if (isLoading) {
    return <TagCloudSkeleton />;
  }

  const maxCount = Math.max(...tags.map(t => t.count), 0);

  const getTagStyle = (count: number) => {
    const ratio = maxCount > 0 ? count / maxCount : 0;
    if (ratio > 0.7) return 'bg-primary/10 text-primary border-primary/20 font-semibold';
    if (ratio > 0.4) return 'bg-muted text-foreground border-border';
    return 'bg-background text-muted-foreground border-border';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Hash size={16} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Popular Topics</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map(({ tag }) => (
          <Link
            key={tag}
            to={`/blogs?search=${encodeURIComponent(tag)}`}
            className={`px-3 py-1.5 text-sm rounded-full border transition-all hover:border-primary hover:text-primary hover:bg-primary/5 ${getTagStyle(tags.find(t => t.tag === tag)?.count || 0)}`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;
