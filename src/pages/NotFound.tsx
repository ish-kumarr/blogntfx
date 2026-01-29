import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, TrendingUp, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The page you're looking for could not be found. Browse our collection of expert trading articles and market analysis."
        url={location.pathname}
      />
      <Navbar />
      <PageTransition>
        <div className="min-h-screen bg-background flex flex-col">
          
          <main className="flex-1 flex items-center justify-center px-6 py-24 pt-32">
          <div className="text-center max-w-xl">
            {/* Animated 404 */}
            <div className="relative mb-8">
              <h1 className="text-[10rem] md:text-[14rem] font-bold text-muted/30 leading-none select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
                  <TrendingUp className="w-12 h-12 text-primary" />
                </div>
              </div>
            </div>
            
            {/* Message */}
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Page Not Found
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Looks like this page has gone off the charts. The market moves fast, 
              but we couldn't find what you're looking for.
            </p>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
              >
                <Home size={18} /> Go Home
              </Link>
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-full font-semibold hover:bg-muted transition-all"
              >
                <BookOpen size={18} /> Browse Articles
              </Link>
            </div>
            
            {/* Quick Links */}
            <div className="pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Popular destinations</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/blogs?category=forex"
                  className="px-4 py-2 text-sm rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Forex Trading
                </Link>
                <Link
                  to="/blogs?category=psychology"
                  className="px-4 py-2 text-sm rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Trading Psychology
                </Link>
                <Link
                  to="/blogs?category=analysis"
                  className="px-4 py-2 text-sm rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Market Analysis
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-2 text-sm rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
        </div>
      </PageTransition>
    </>
  );
};

export default NotFound;