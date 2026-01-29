import { useEffect, useState } from 'react';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="hidden md:block fixed top-[73px] left-0 right-0 h-1 bg-border z-40">
      <div className="reading-progress h-full transition-all duration-150" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ReadingProgress;
