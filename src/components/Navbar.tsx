import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, SlidersHorizontal } from 'lucide-react';
import logoIcon from '@/assets/logo-icon.png';
import { categories } from '@/data/blogPosts';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/about', label: 'About' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 md:px-6 py-2.5 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <img src={logoIcon} alt="New TradeFx" className="h-7 w-7 md:h-10 md:w-10 transition-transform group-hover:scale-105" />
          <span className="font-serif text-base md:text-xl font-semibold text-foreground">New TradeFx</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`body-small font-medium transition-colors ${
                location.pathname === link.path
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-1.5 -mr-1.5 text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-fade-in max-h-[80vh] overflow-y-auto">
          <div className="container mx-auto px-4 py-3">
            {/* Main Nav Links */}
            <div className="flex flex-col gap-0.5 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary bg-primary/5'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            {/* Quick Filters */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-2 px-3 mb-3">
                <SlidersHorizontal size={14} className="text-muted-foreground" />
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Filters</span>
              </div>
              <div className="flex flex-wrap gap-2 px-3">
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.id === 'all' ? '/blogs' : `/blogs?category=${cat.id}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
