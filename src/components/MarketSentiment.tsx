import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

interface SentimentData {
  pair: string;
  bullish: number;
  bearish: number;
  trend: 'up' | 'down' | 'neutral';
}

// Simulated sentiment data - in production this would come from an API
const generateSentiment = (): SentimentData[] => {
  const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'Gold', 'S&P 500'];
  return pairs.map(pair => {
    const bullish = Math.floor(Math.random() * 40) + 30;
    const bearish = 100 - bullish;
    return {
      pair,
      bullish,
      bearish,
      trend: bullish > 55 ? 'up' : bullish < 45 ? 'down' : 'neutral'
    };
  });
};

const MarketSentiment = () => {
  const [sentiment, setSentiment] = useState<SentimentData[]>(generateSentiment());
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setSentiment(generateSentiment());
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={14} className="text-emerald-600" />;
      case 'down':
        return <TrendingDown size={14} className="text-red-500" />;
      default:
        return <Minus size={14} className="text-muted-foreground" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Activity size={16} className="text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>Market Sentiment</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-5">
        {sentiment.map((item) => (
          <div key={item.pair} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                {getTrendIcon(item.trend)}
                <span className="font-semibold text-foreground">{item.pair}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-emerald-600 font-medium">{item.bullish}%</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-red-500 font-medium">{item.bearish}%</span>
              </div>
            </div>
            <div className="h-2 bg-red-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${item.bullish}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border text-center">
        Updated {lastUpdate.toLocaleTimeString()}
      </p>
    </div>
  );
};

export default MarketSentiment;
