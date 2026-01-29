import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TrendingUp, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';

const fetchPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.posts;
};

// Get trending posts (featured + recent)
const getTrendingPosts = (posts: BlogPost[]) => {
  return [...posts]
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    })
    .slice(0, 5);
};

const TrendingPostsSkeleton = () => (
  <div className="bg-white rounded-2xl p-6 border border-border shadow-sm animate-pulse">
    <div className="flex items-center gap-2 mb-6">
      <div className="w-8 h-8 rounded-lg bg-muted" />
      <div className="h-6 w-32 bg-muted rounded" />
    </div>
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex gap-4 p-3 -mx-3">
          <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-3 bg-muted rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
    <div className="mt-6 pt-4 border-t border-border h-5 w-24 bg-muted rounded-full mx-auto" />
  </div>
);

const TrendingPosts = () => {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blogPostsForTrending'],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <TrendingPostsSkeleton />;
  }
  
  const trending = getTrendingPosts(posts);

  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <TrendingUp size={16} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Trending Now</h3>
      </div>
      <div className="space-y-4">
        {trending.map((post, index) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="flex gap-4 group p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-primary/50 transition-colors w-8 flex-shrink-0">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-1">
                {post.title}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-primary font-medium">{post.categoryLabel}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  {post.readingTime} min
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link 
        to="/blogs" 
        className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-border text-sm font-medium text-primary hover:gap-3 transition-all"
      >
        View All <ArrowRight size={14} />
      </Link>
    </div>
  );
};

export default TrendingPosts;
