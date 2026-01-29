import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import { CardSkeleton } from '@/components/Skeletons';
import TradingViewTicker from '@/components/TradingViewTicker';
import TradingViewMarketOverview from '@/components/TradingViewMarketOverview';
import TagCloud from '@/components/TagCloud';
import TrendingPosts from '@/components/TrendingPosts';
import MarketSentiment from '@/components/MarketSentiment';
import FeaturedArticle from '@/components/FeaturedArticle';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import { categories, type BlogPost } from '@/data/blogPosts';
import logoWide from '@/assets/logo-wide.png';
import { ArrowRight, TrendingUp, BarChart3, BookOpen, Shield, Users } from 'lucide-react';

const fetchPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.posts;
};

const Index = () => {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['blogPostsForIndex'],
    queryFn: fetchPosts,
  });

  const recentPosts = posts 
    ? [...posts].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()).slice(0, 12) 
    : [];

  const featuredCarouselPosts = recentPosts.length > 0 ? (() => {
    const featured = posts?.find(p => p.featured);
    return featured 
      ? [featured, ...recentPosts.filter(p => p.id !== featured.id).slice(0, 4)]
      : recentPosts.slice(0, 5);
  })() : [];
  
  const latestPosts = recentPosts.slice(0, 6);
  const morePosts = recentPosts.slice(6, 9);

  return (
    <>
    <SEO 
      title="Expert Forex Trading Insights & Market Analysis"
      description="In-depth forex research, market analysis, and educational content from professional traders. Master technical analysis, risk management, and trading psychology."
      url="/"
    />
    <Navbar />
    <PageTransition>
    <div className="min-h-screen bg-background">
      
      <div className="pt-[57px] md:pt-[73px]">
        <TradingViewTicker />
      </div>
      
      <section className="relative py-10 md:py-16 lg:py-20 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        <div className="container mx-auto relative">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-medium mb-4 md:mb-6">
              <TrendingUp size={14} className="md:w-4 md:h-4" />
              <span>Trusted by 10,000+ traders</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 max-w-4xl mx-auto leading-[1.15]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Expert Trading Insights for the <span className="text-primary">Modern Trader</span>
            </h1>
            <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 md:mb-8 leading-relaxed px-2">
              In-depth research, market analysis, and educational content from professional traders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
              <Link 
                to="/blogs" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:gap-3 shadow-lg shadow-primary/25 text-sm md:text-base"
              >
                Explore Articles <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </Link>
              <Link 
                to="/about" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-background text-foreground rounded-full font-semibold border-2 border-border hover:border-primary hover:text-primary transition-all text-sm md:text-base"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <FeaturedArticle posts={featuredCarouselPosts} isLoading={isLoading} />
          </div>

          <div className="md:hidden">
            <h3 className="text-sm font-semibold text-foreground mb-3">Featured Articles</h3>
            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
              {(isLoading ? [...Array(5)] : recentPosts.slice(0, 5)).map((post, i) => (
                post ? (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="flex-shrink-0 w-[260px] bg-card border border-border rounded-xl overflow-hidden shadow-sm"
                  >
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-3">
                      <span className="text-[10px] font-medium text-primary uppercase tracking-wider">{post.categoryLabel}</span>
                      <h4 className="text-sm font-semibold text-foreground line-clamp-2 mt-1 leading-snug">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1.5">{post.readingTime} min read</p>
                    </div>
                  </Link>
                ) : (
                  <div key={i} className="flex-shrink-0 w-[260px] bg-card border border-border rounded-xl overflow-hidden shadow-sm animate-pulse">
                    <div className="w-full h-32 bg-muted"/>
                    <div className="p-3 space-y-2">
                      <div className="h-3 w-20 bg-muted rounded"/>
                      <div className="h-4 w-full bg-muted rounded"/>
                      <div className="h-4 w-3/4 bg-muted rounded"/>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 px-4 md:px-6 border-y border-border bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { icon: BookOpen, value: isLoading ? '...' : '30+', label: 'Expert Articles', color: 'text-primary' },
              { icon: BarChart3, value: 'Daily', label: 'Market Analysis', color: 'text-emerald-600' },
              { icon: Shield, value: isLoading ? '...' : '10+', label: 'Risk Guides', color: 'text-amber-600' },
              { icon: Users, value: '10k+', label: 'Active Readers', color: 'text-violet-600' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${stat.color} bg-current/10 flex items-center justify-center mx-auto mb-2 md:mb-4`}>
                  <stat.icon size={18} className={`${stat.color} md:w-6 md:h-6`} />
                </div>
                <p className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-0.5 md:mb-1">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 md:py-8 px-4 md:px-6 border-b border-border">
        <div className="container mx-auto">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:items-center md:justify-center -mx-4 px-4 md:mx-0 md:px-0">
            {categories.slice(1).map((cat) => (
              <Link
                key={cat.id}
                to={`/blogs?category=${cat.id}`}
                className="flex-shrink-0 px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all whitespace-nowrap"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-4 mb-6 md:mb-10">
            <div>
              <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2 block">Latest Insights</span>
              <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
                Fresh From Our Desk
              </h2>
            </div>
            <Link 
              to="/blogs" 
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm md:text-base hover:gap-3 transition-all"
            >
              View All <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {isLoading ? (
              [...Array(6)].map((_, i) => <CardSkeleton key={i} />)
            ) : (
              latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 lg:py-20 px-4 md:px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 md:gap-10">
            <div className="lg:col-span-2 space-y-6 md:space-y-8">
              <div>
                <span className="text-primary font-semibold text-xs md:text-sm uppercase tracking-wider mb-1 md:mb-2 block">Real-Time Data</span>
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Live Market Overview
                </h2>
                <TradingViewMarketOverview />
              </div>
              
              <div className="hidden md:block">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-4 md:mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  More to Explore
                </h3>
                <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                  {isLoading ? (
                    [...Array(3)].map((_, i) => <CardSkeleton key={i} />)
                  ) : (
                    morePosts.map((post) => (
                      <BlogCard key={post.id} post={post} />
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="hidden lg:block space-y-6 md:space-y-8">
              <MarketSentiment />
              <TrendingPosts />
              <TagCloud />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-4 md:px-6 bg-foreground text-background">
        <div className="container mx-auto text-center">
          <img src={logoWide} alt="New TradeFx Services" className="h-8 md:h-10 mx-auto mb-6 md:mb-8 brightness-0 invert" />
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 max-w-2xl mx-auto" style={{ fontFamily: "'Playfair Display', serif" }}>
            Start Your Trading Education Today
          </h2>
          <p className="text-sm md:text-lg text-background/70 mb-6 md:mb-8 max-w-xl mx-auto px-4">
            Join thousands of traders who trust our research and insights.
          </p>
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white text-foreground rounded-full font-semibold hover:bg-white/90 transition-all hover:gap-3 text-sm md:text-base"
          >
            Browse All Articles <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
    </PageTransition>
    </>
  );
};

export default Index;
