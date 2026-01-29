import { useEffect, useRef } from 'react';

interface TradingViewMiniChartProps {
  symbol?: string;
  width?: string | number;
  height?: number;
}

const TradingViewMiniChart = ({ 
  symbol = "FOREXCOM:EURUSD", 
  width = "100%",
  height = 200 
}: TradingViewMiniChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbol: symbol,
      width: width,
      height: height,
      locale: "en",
      dateRange: "1D",
      colorTheme: "light",
      isTransparent: false,
      autosize: false,
      largeChartUrl: ""
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol, width, height]);

  return (
    <div className="tradingview-widget-container rounded-xl overflow-hidden bg-white border border-border shadow-sm" ref={containerRef}>
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
};

export default TradingViewMiniChart;
