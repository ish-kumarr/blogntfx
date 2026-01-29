import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReadingProgress from '@/components/ReadingProgress';
import BlogCard from '@/components/BlogCard';
import ShareModal from '@/components/ShareModal';
import TradingViewMiniChart from '@/components/TradingViewMiniChart';
import TagCloud from '@/components/TagCloud';
import TrendingPosts from '@/components/TrendingPosts';
import PageTransition from '@/components/PageTransition';
import SEO from '@/components/SEO';
import { type BlogPost as BlogPostType } from '@/data/blogPosts';
import { Clock, ArrowLeft, Linkedin, Twitter, Share2, Tag, Loader2 } from 'lucide-react';

// Fetch functions
const fetchPost = async (slug: string): Promise<BlogPostType> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  if (response.status === 404) throw new Error('Post not found');
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.post;
};

const fetchAllPosts = async (): Promise<BlogPostType[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.posts;
};


// Extract relevant tags from post content
const extractPostTags = (content: string, title: string): string[] => {
  const tagKeywords = [
    'EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF',
    'Forex', 'Currency', 'Technical Analysis', 'Fundamental Analysis',
    'Risk Management', 'Psychology', 'Candlestick', 'Support', 'Resistance',
    'Trend', 'Breakout', 'Volatility', 'Leverage', 'Hedging',
    'Central Banks', 'Interest Rates', 'Fibonacci', 'Moving Average',
    'Stop Loss', 'Take Profit', 'Position Sizing'
  ];

  const text = `${title} ${content}`.toLowerCase();
  return tagKeywords
    .filter(tag => text.includes(tag.toLowerCase()))
    .slice(0, 6);
};

// Get relevant chart symbol based on post content
const getRelevantSymbol = (content: string, title: string): string => {
  const text = `${title} ${content}`.toLowerCase();
  if (text.includes('eur/usd') || text.includes('eurusd')) return 'FOREXCOM:EURUSD';
  if (text.includes('gbp/usd') || text.includes('gbpusd')) return 'FOREXCOM:GBPUSD';
  if (text.includes('usd/jpy') || text.includes('usdjpy')) return 'FOREXCOM:USDJPY';
  if (text.includes('gold')) return 'TVC:GOLD';
  if (text.includes('aud')) return 'FOREXCOM:AUDUSD';
  return 'FOREXCOM:EURUSD'; // Default
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const { data: post, isLoading, isError, error } = useQuery<BlogPostType, Error>({
    queryKey: ['blogPost', slug],
    queryFn: () => fetchPost(slug!),
    enabled: !!slug,
    retry: (failureCount, err) => {
      if (err.message === 'Post not found') return false;
      return failureCount < 3;
    },
  });

  const { data: allPosts = [] } = useQuery<BlogPostType[]>({
    queryKey: ['blogPosts'],
    queryFn: fetchAllPosts,
  });

  const relatedPosts = useMemo(() => {
    if (!post || allPosts.length === 0) return [];
    
    const postTags = extractPostTags(post.content, post.title);
    
    return allPosts
      .filter(p => p.slug !== post.slug)
      .map(p => {
        const pTags = extractPostTags(p.content, p.title);
        const sharedTags = postTags.filter(t => pTags.includes(t));
        const categoryMatch = p.category === post.category ? 2 : 0;
        return { ...p, relevanceScore: sharedTags.length + categoryMatch };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 3);
  }, [post, allPosts]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
        <Footer />
      </>
    );
  }
  
  if (isError || !post) {
    // This will catch both network errors and the specific 'Post not found' error
    return (
      <>
        <SEO 
          title="Article Not Found"
          description="The article you're looking for could not be found. Browse our collection of expert trading articles."
          url={`/blog/${slug}`}
        />
        <Navbar />
        <PageTransition>
          <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 flex items-center justify-center px-6 py-24 pt-32">
              <div className="text-center max-w-lg">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Article Not Found
                </h1>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We couldn't find the article you're looking for. It may have been moved or no longer exists.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all"
                  >
                    <ArrowLeft size={18} /> Browse All Articles
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full font-semibold hover:bg-muted transition-all"
                  >
                    Go Home
                  </Link>
                </div>
              </div>
            </main>
            <Footer />
          </div>
        </PageTransition>
      </>
    );
  }

  const postTags = extractPostTags(post.content, post.title);
  const chartSymbol = getRelevantSymbol(post.content, post.title);
  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(post.title);
  const publishDate = new Date(post.publishDate);

  return (
    <>
    <SEO 
      title={post.title}
      description={post.excerpt}
      url={`/blog/${post.slug}`}
      type="article"
      image={post.featuredImage}
      author={post.author}
      publishedTime={post.publishDate}
      section={post.categoryLabel}
      tags={postTags}
      keywords={`${post.categoryLabel}, ${postTags.join(', ')}, forex trading, market analysis`}
    />
    <Navbar />
    <ReadingProgress />
    <PageTransition>
    <div className="min-h-screen bg-background">

      <article className="pt-24">
        <div className="container mx-auto max-w-3xl px-6 py-6">
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> All Articles
          </Link>
        </div>

        <header className="container mx-auto max-w-3xl px-6 pb-8">
          <Link 
            to={`/blogs?category=${post.category}`}
            className="inline-block text-primary font-medium text-sm mb-4 hover:underline"
          >
            {post.categoryLabel}
          </Link>
          
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight text-foreground mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            {post.title}
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
            {post.excerpt}
          </p>

          {postTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Tag size={14} className="text-muted-foreground" />
              {postTags.map(tag => (
                <Link
                  key={tag}
                  to={`/blogs?search=${encodeURIComponent(tag)}`}
                  className="px-2.5 py-1 text-xs rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t border-b border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-semibold text-lg">NT</span>
              </div>
              <div>
                <p className="font-medium text-foreground">{post.author}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{publishDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsShareModalOpen(true)}
                className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        <figure className="container mx-auto max-w-4xl px-6 mb-12">
          <img 
            src={post.featuredImage} 
            alt={post.title} 
            className="w-full aspect-[2/1] object-cover rounded-xl"
          />
        </figure>

        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div 
                className="blog-content max-w-3xl" 
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                    .replace(/^> "(.+)"$/gm, '<blockquote>"$1"</blockquote>')
                    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
                    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                    .replace(/^- (.+)$/gm, '<li>$1</li>')
                    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
                    .split('\n\n')
                    .map(block => {
                      const trimmed = block.trim();
                      if (!trimmed) return '';
                      if (trimmed.startsWith('<h2>') || trimmed.startsWith('<h3>') || 
                          trimmed.startsWith('<blockquote>') || trimmed.startsWith('<li>')) {
                        if (trimmed.startsWith('<li>')) {
                          return `<ul>${trimmed.replace(/\n/g, '')}</ul>`;
                        }
                        return trimmed;
                      }
                      return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
                    })
                    .join('\n')
                }} 
              />

              <div className="py-12 border-t border-border mt-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-muted-foreground font-medium">
                    Found this article helpful? Share it with others.
                  </p>
                  <div className="flex gap-3">
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                    >
                      <Twitter size={16} /> Share on X
                    </a>
                    <a 
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors"
                    >
                      <Linkedin size={16} /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="pb-12">
                <div className="bg-muted/50 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-bold text-xl">NT</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Written by</p>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{post.author}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Our research team provides expert analysis and education for forex traders at every level. 
                        We combine institutional-grade research with practical trading insights.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Related Market</h3>
                  <TradingViewMiniChart symbol={chartSymbol} />
                </div>

                <TrendingPosts />

                <TagCloud />
              </div>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="border-t border-border mt-8">
            <div className="container mx-auto max-w-6xl px-6 py-16">
              <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Related Articles
              </h2>
              <p className="text-muted-foreground mb-8">Based on similar topics and themes</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <Footer />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={post.title}
        excerpt={post.excerpt}
        url={window.location.href}
      />
    </div>
    </PageTransition>
    </>
  );
};

export default BlogPost;
