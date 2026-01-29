import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { FeaturedSkeleton } from './Skeletons';
import type { BlogPost } from '@/data/blogPosts';

interface FeaturedArticleProps {
  posts: BlogPost[];
  isLoading: boolean;
}

const FeaturedArticle = ({ posts, isLoading }: FeaturedArticleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback((index: number, dir: 'left' | 'right') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(dir);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating, setIsAnimating, setDirection, setCurrentIndex]);

  const goToPrev = () => {
    if (posts.length === 0) return;
    const newIndex = (currentIndex - 1 + posts.length) % posts.length;
    goToSlide(newIndex, 'left');
  };

  const goToNext = useCallback(() => {
    if (posts.length === 0) return;
    const newIndex = (currentIndex + 1) % posts.length;
    goToSlide(newIndex, 'right');
  }, [currentIndex, posts.length, goToSlide]);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);
  
  if (isLoading) {
    return <FeaturedSkeleton />;
  }

  if (!posts || posts.length === 0) return null;

  return (
    <div className="relative group">
      {/* Main Featured Card */}
      <div className="relative overflow-hidden rounded-2xl bg-foreground">
        {/* Background Images with Animation */}
        <div className="absolute inset-0">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : direction === 'right'
                    ? index === (currentIndex - 1 + posts.length) % posts.length
                      ? 'opacity-0 -translate-x-full scale-105'
                      : 'opacity-0 translate-x-full scale-105'
                    : index === (currentIndex + 1) % posts.length
                      ? 'opacity-0 translate-x-full scale-105'
                      : 'opacity-0 -translate-x-full scale-105'
              }`}
            >
              <img 
                src={post.featuredImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        </div>
        
        {/* Content with Animation */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16 pl-16 md:pl-20 lg:pl-24 pr-16 md:pr-20 lg:pr-24 min-h-[520px] md:min-h-[580px] flex flex-col justify-end">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`max-w-3xl transition-all duration-500 ease-out ${
                index === currentIndex 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8 absolute pointer-events-none'
              }`}
              style={{
                transitionDelay: index === currentIndex ? '150ms' : '0ms',
              }}
            >
              <div className={`flex items-center gap-3 mb-6 transition-all duration-500 ${
                index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`} style={{ transitionDelay: index === currentIndex ? '200ms' : '0ms' }}>
                <span className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/10">
                  {post.categoryLabel}
                </span>
                <span className="text-white/70 text-sm">
                  {new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              
              <Link to={`/blog/${post.slug}`}>
                <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight hover:text-white/90 transition-all duration-500 ${
                  index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
                }`} style={{ fontFamily: "'Playfair Display', serif", transitionDelay: index === currentIndex ? '250ms' : '0ms' }}>
                  {post.title}
                </h1>
              </Link>
              
              <p className={`text-white/80 text-lg md:text-xl mb-8 line-clamp-2 max-w-2xl leading-relaxed transition-all duration-500 ${
                index === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`} style={{ transitionDelay: index === currentIndex ? '300ms' : '0ms' }}>
                {post.excerpt}
              </p>
              
              <div className={`flex items-center gap-6 transition-all duration-500 ${
                index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`} style={{ transitionDelay: index === currentIndex ? '350ms' : '0ms' }}>
                <Link 
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-foreground rounded-full font-semibold hover:bg-white/90 transition-all hover:gap-3 hover:shadow-lg"
                >
                  Read Article <ArrowRight size={18} />
                </Link>
                <span className="flex items-center gap-2 text-white/70">
                  <Clock size={16} /> {post.readingTime} min read
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-8 right-8 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {String(currentIndex + 1).padStart(2, '0')} / {String(posts.length).padStart(2, '0')}
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {posts.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx, idx > currentIndex ? 'right' : 'left')}
            className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: idx === currentIndex ? '48px' : '24px' }}
          >
            <div className="absolute inset-0 bg-border" />
            <div 
              className={`absolute inset-0 bg-primary rounded-full transition-transform duration-[6000ms] ease-linear origin-left ${
                idx === currentIndex ? 'scale-x-100' : 'scale-x-0'
              }`}
              style={{
                transitionDuration: idx === currentIndex ? '6000ms' : '300ms',
                transform: idx === currentIndex ? 'scaleX(1)' : 'scaleX(0)'
              }}
            />
          </button>
        ))}
      </div>

      <div className="hidden lg:flex justify-center gap-3 mt-6">
        {posts.map((post, idx) => (
          <button
            key={post.id}
            onClick={() => goToSlide(idx, idx > currentIndex ? 'right' : 'left')}
            className={`relative w-20 h-14 rounded-lg overflow-hidden transition-all duration-300 ${
              idx === currentIndex 
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105' 
                : 'opacity-60 hover:opacity-100'
            }`}
          >
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default FeaturedArticle;
