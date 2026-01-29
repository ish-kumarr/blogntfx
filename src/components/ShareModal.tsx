import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Twitter, Linkedin, Facebook, Link2, Check, X } from 'lucide-react';
import logoWide from '@/assets/logo-wide.png';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  excerpt: string;
  url: string;
}

const ShareModal = ({ isOpen, onClose, title, excerpt, url }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      <div 
        className="relative w-full max-w-md max-h-[85vh] overflow-y-auto bg-background rounded-2xl shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'scale-in 0.2s ease-out' }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground z-10"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="p-5 pt-10 md:p-6 md:pt-12">
          {/* Logo */}
          <div className="flex justify-center mb-4 md:mb-6">
            <img src={logoWide} alt="TradeFx" className="h-6 md:h-8 object-contain" />
          </div>

          {/* Title */}
          <h3 className="text-base md:text-lg font-semibold text-foreground text-center mb-4 md:mb-6">
            Share this article
          </h3>

          {/* Article Preview */}
          <div className="bg-muted/50 rounded-xl p-3 md:p-4 mb-4 md:mb-6 border border-border/50">
            <p className="text-xs md:text-sm font-medium text-foreground line-clamp-2 mb-1">{title}</p>
            <p className="text-[11px] md:text-xs text-muted-foreground line-clamp-2">{excerpt}</p>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center justify-center gap-4 md:gap-6 mb-4 md:mb-6">
            <a 
              href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 md:gap-2 group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted flex items-center justify-center group-hover:bg-[#1DA1F2]/20 transition-all duration-200 group-hover:scale-110">
                <Twitter size={20} className="md:w-6 md:h-6 text-muted-foreground group-hover:text-[#1DA1F2] transition-colors" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-muted-foreground">X</span>
            </a>
            
            <a 
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 md:gap-2 group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-all duration-200 group-hover:scale-110">
                <Linkedin size={20} className="md:w-6 md:h-6 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-muted-foreground">LinkedIn</span>
            </a>
            
            <a 
              href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 md:gap-2 group"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-muted flex items-center justify-center group-hover:bg-[#1877F2]/20 transition-all duration-200 group-hover:scale-110">
                <Facebook size={20} className="md:w-6 md:h-6 text-muted-foreground group-hover:text-[#1877F2] transition-colors" />
              </div>
              <span className="text-[10px] md:text-xs font-medium text-muted-foreground">Facebook</span>
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-3 md:mb-4">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-[10px] md:text-xs text-muted-foreground">or copy link</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Copy Link Section */}
          <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-2 border border-border/50">
            <div className="flex-1 px-2 md:px-3 py-2 bg-background rounded-md text-xs md:text-sm text-foreground truncate border border-border/50">
              {url}
            </div>
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                copied 
                  ? 'bg-green-500/20 text-green-500 border border-green-500/30' 
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} className="md:w-4 md:h-4" /> Copied!
                </>
              ) : (
                <>
                  <Link2 size={14} className="md:w-4 md:h-4" /> Copy
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  return createPortal(modalContent, document.body);
};

export default ShareModal;
