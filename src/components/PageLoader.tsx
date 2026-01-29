import { useState, useEffect, ReactNode } from 'react';
import { TrendingUp } from 'lucide-react';

const tradingFacts = [
  "The forex market trades over $7.5 trillion daily, making it the world's largest financial market.",
  "The first stock exchange was established in Amsterdam in 1602.",
  "Warren Buffett made 99% of his wealth after turning 50 years old.",
  "The term 'bull market' comes from the way a bull attacks – thrusting its horns upward.",
  "The average holding time for a stock in 1960 was 8 years. Today it's less than 6 months.",
  "Japan's stock market took 34 years to recover from its 1989 peak.",
  "The S&P 500 has historically returned about 10% annually over the long term.",
  "George Soros made $1 billion in a single day betting against the British pound in 1992.",
  "The fear of missing out (FOMO) causes 76% of retail traders to enter trades too late.",
  "Professional traders typically risk only 1-2% of their capital per trade.",
  "The 'January Effect' suggests stocks tend to rise more in January than other months.",
  "Algorithmic trading accounts for over 70% of all trades in the US stock market.",
  "The phrase 'sell in May and go away' has historical backing in market data.",
  "Currency pairs are always quoted in pairs because you're buying one and selling another.",
  "The US dollar is involved in approximately 88% of all forex trades.",
  "Most successful traders have a win rate of only 40-60%, but their winners are bigger than losers.",
  "The first futures contracts were rice futures in 17th century Japan.",
  "Black Monday in 1987 saw the Dow Jones fall 22.6% in a single day.",
  "The term 'pip' in forex stands for 'percentage in point'.",
  "Compound interest was called the 'eighth wonder of the world' by Einstein.",
  "The VIX index is known as the 'fear index' as it measures market volatility expectations.",
  "London, New York, and Tokyo handle over 50% of all forex trading volume.",
  "The gold standard was officially abandoned in 1971 by President Nixon.",
  "Day traders who trade frequently tend to underperform buy-and-hold investors.",
  "The Rule of 72 helps estimate how long it takes to double money at a given interest rate.",
  "Jesse Livermore made $100 million during the 1929 crash by short selling.",
  "The first ETF was launched in Canada in 1990, before the US had any.",
  "Central banks hold approximately 35,000 tonnes of gold reserves worldwide.",
  "The Swiss franc is considered one of the world's safest currencies.",
  "Diversification can reduce portfolio risk by up to 25% without sacrificing returns."
];

interface PageLoaderProps {
  children: ReactNode;
  delay?: number;
}

const PageLoader = ({ children, delay = 300 }: PageLoaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fact] = useState(() => tradingFacts[Math.floor(Math.random() * tradingFacts.length)]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          {/* Animated Logo/Spinner */}
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-muted animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          
          {/* Trading Fact */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Did you know?
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {fact}
            </p>
          </div>
          
          {/* Loading dots */}
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageLoader;
