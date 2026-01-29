import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import TradingViewTicker from '@/components/TradingViewTicker';
import TagCloud from '@/components/TagCloud';
import TrendingPosts from '@/components/TrendingPosts';
import MarketSentiment from '@/components/MarketSentiment';
import EconomicCalendarWidget from '@/components/EconomicCalendarWidget';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import { categories, type BlogPost } from '@/data/blogPosts';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { CardSkeleton } from '@/components/Skeletons';

const fetchPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.posts;
};

const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'reading-time'>('recent');
  const [showFilters, setShowFilters] = useState(false);

  const { data: blogPosts = [], isLoading, isError } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchPosts,
  });

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = activeCategory === 'all' 
      ? blogPosts 
      : blogPosts.filter(p => p.category === activeCategory);

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.excerpt.toLowerCase().includes(query) ||
        p.content.toLowerCase().includes(query) ||
        p.categoryLabel.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'oldest':
        return [...posts].sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime());
      case 'reading-time':
        return [...posts].sort((a, b) => a.readingTime - b.readingTime);
      default:
        return [...posts].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    }
  }, [activeCategory, searchQuery, sortBy, blogPosts]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const clearSearch = () => {
    setSearchQuery('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  };

  const activeCategoryLabel = categories.find(c => c.id === activeCategory)?.label || 'All Articles';

  return (
    <>
    <SEO 
      title={activeCategory === 'all' ? 'Trading Insights & Articles' : `${activeCategoryLabel} Articles`}
      description={`Browse our collection of ${activeCategory === 'all' ? 'expert trading articles' : activeCategoryLabel.toLowerCase() + ' articles'} covering forex strategies, market analysis, and trading education.`}
      url="/blogs"
      keywords={`forex articles, trading insights, ${activeCategoryLabel.toLowerCase()}, market analysis, trading education`}
    />
    <Navbar />
    <PageTransition>
    <div className="min-h-screen bg-background">
      
      {/* Live Ticker */}
      <div className="pt-[57px] md:pt-[73px]">
        <TradingViewTicker />
      </div>
      
      {/* Header */}
      <section className="py-8 md:py-12 px-4 md:px-6 bg-navy-deep">
        <div className="container mx-auto text-center">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Trading Insights
          </h1>
          <p className="text-sm md:text-lg text-text-secondary max-w-2xl mx-auto mb-6 md:mb-8 px-2">
            Expert analysis and education for forex traders at every level.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-11 py-2.5 md:py-3 rounded-full bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm md:text-base"
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-4 md:py-6 px-4 md:px-6 border-b border-border md:sticky md:top-[73px] bg-background/95 backdrop-blur-sm z-30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex-shrink-0 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-muted transition-colors w-full md:w-auto"
            >
              <SlidersHorizontal size={16} />
              Filters
              {!isLoading && <span className="text-xs text-muted-foreground">({filteredPosts.length} results)</span>}
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-border flex flex-col md:flex-row md:items-center gap-3 md:gap-4 animate-fade-in">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {[
                  { value: 'recent', label: 'Most Recent' },
                  { value: 'oldest', label: 'Oldest First' },
                  { value: 'reading-time', label: 'Reading Time' },
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value as typeof sortBy)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      sortBy === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              {!isLoading && <span className="text-sm text-muted-foreground md:ml-4">{filteredPosts.length} articles found</span>}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
            <div className="lg:col-span-3 order-2 lg:order-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {[...Array(9)].map((_, i) => <CardSkeleton key={i} />)}
                </div>
              ) : isError ? (
                <div className="text-center py-12 md:py-16 text-red-500">
                  <p className="text-lg md:text-xl mb-4">Failed to load articles.</p>
                  <p>Please check your connection or try again later.</p>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 md:py-16">
                  <p className="text-lg md:text-xl text-muted-foreground mb-4">No articles found</p>
                  <button
                    onClick={() => { setActiveCategory('all'); clearSearch(); }}
                    className="text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2 lg:space-y-6">
              <div className="lg:hidden mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Trending Now</h3>
                <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide -mx-4 px-4">
                  {(isLoading ? [...Array(5)] : blogPosts.slice(0, 5)).map((post, i) => (
                    post ? (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="flex-shrink-0 w-[280px] bg-card border border-border rounded-xl p-3 flex gap-3 hover:shadow-md transition-shadow"
                      >
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-medium text-primary">{post.categoryLabel}</span>
                          <h4 className="text-sm font-semibold text-foreground line-clamp-2 mt-1">{post.title}</h4>
                        </div>
                      </Link>
                    ) : (
                      <div key={i} className="flex-shrink-0 w-[280px] bg-card border border-border rounded-xl p-3 flex gap-3 animate-pulse">
                        <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0"/>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="w-16 h-4 bg-muted rounded"/>
                          <div className="h-5 bg-muted rounded w-full"/>
                          <div className="h-5 bg-muted rounded w-3/4"/>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
              
              <div className="hidden lg:block space-y-6">
                <TrendingPosts />
                <EconomicCalendarWidget />
                <MarketSentiment />
                <TagCloud />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </PageTransition>
    </>
  );
};

export default Blogs;
