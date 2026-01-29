import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/blogPosts';
import { Clock, ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  variant?: 'default' | 'horizontal' | 'minimal';
}

const BlogCard = ({ post, featured = false, variant = 'default' }: BlogCardProps) => {
  if (featured) {
    return (
      <Link to={`/blog/${post.slug}`} className="block group">
        <article className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-[16/10] md:aspect-[4/3] overflow-hidden">
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary w-fit mb-4">
                {post.categoryLabel}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span className="flex items-center gap-1"><Clock size={14} /> {post.readingTime} min</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === 'horizontal') {
    return (
      <Link to={`/blog/${post.slug}`} className="block group">
        <article className="flex gap-5 p-4 rounded-xl hover:bg-muted/50 transition-colors">
          <div className="w-28 h-20 flex-shrink-0 rounded-lg overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium text-primary">{post.categoryLabel}</span>
            <h3 className="text-sm font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h3>
            <span className="text-xs text-muted-foreground mt-2 block">
              {post.readingTime} min read
            </span>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.slug}`} className="block group">
      <article className="bg-card border border-border rounded-2xl overflow-hidden h-full flex flex-col shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1">
        <div className="aspect-[16/10] overflow-hidden relative">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight size={18} className="text-foreground" />
          </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary w-fit mb-3">
            {post.categoryLabel}
          </span>
          <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
            <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readingTime} min</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
