import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import type { BlogPost } from '@/data/blogPosts';

interface HeroCarouselProps {
  posts: BlogPost[];
  isLoading: boolean;
}

const HeroCarouselSkeleton = () => (
  <div className="relative overflow-hidden rounded-2xl bg-muted border border-border shadow-lg animate-pulse">
    <div className="grid md:grid-cols-2">
      <div className="aspect-[16/10] md:aspect-auto bg-muted-foreground/10" />
      <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center space-y-4">
        <div className="h-6 w-32 bg-muted-foreground/10 rounded-full" />
        <div className="h-8 w-3/4 bg-muted-foreground/10 rounded" />
        <div className="h-5 w-full bg-muted-foreground/10 rounded" />
        <div className="h-5 w-2/3 bg-muted-foreground/10 rounded" />
        <div className="flex items-center gap-3">
          <div className="h-4 w-20 bg-muted-foreground/10 rounded" />
          <div className="h-4 w-16 bg-muted-foreground/10 rounded" />
        </div>
        <div className="h-4 w-24 bg-muted-foreground/10 rounded" />
      </div>
    </div>
  </div>
);

const HeroCarousel = ({ posts, isLoading }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (posts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [posts.length]);

  const goToPrev = () => {
    if (posts.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  }
  const goToNext = () => {
    if (posts.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  }

  if (isLoading) {
    return <HeroCarouselSkeleton />;
  }

  if (!posts || posts.length === 0) return null;
  const post = posts[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white border border-border shadow-lg">
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:hidden" />
        </div>
        <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary w-fit mb-4">
            {post.categoryLabel}
          </span>
          <Link to={`/blog/${post.slug}`}>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-3 hover:text-primary transition-colors leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {post.title}
            </h2>
          </Link>
          <p className="text-muted-foreground mb-4 line-clamp-2 text-sm md:text-base">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
            <span>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {post.readingTime} min</span>
          </div>
          <Link 
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline text-sm"
          >
            Read Article →
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <button 
        onClick={goToPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-border shadow-md flex items-center justify-center text-foreground hover:bg-white transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 border border-border shadow-md flex items-center justify-center text-foreground hover:bg-white transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
