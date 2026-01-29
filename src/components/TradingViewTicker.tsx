import { useEffect, useRef } from 'react';

const TradingViewTicker = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:EURUSD", title: "EUR/USD" },
        { proName: "FOREXCOM:GBPUSD", title: "GBP/USD" },
        { proName: "FOREXCOM:USDJPY", title: "USD/JPY" },
        { proName: "FOREXCOM:AUDUSD", title: "AUD/USD" },
        { proName: "FOREXCOM:USDCHF", title: "USD/CHF" },
        { proName: "FOREXCOM:USDCAD", title: "USD/CAD" },
        { proName: "TVC:GOLD", title: "Gold" },
        { proName: "TVC:SILVER", title: "Silver" }
      ],
      showSymbolLogo: true,
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en"
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full bg-white border-b border-border overflow-hidden">
      <div className="tradingview-widget-container" ref={containerRef}>
        <div className="tradingview-widget-container__widget"></div>
      </div>
    </div>
  );
};

export default TradingViewTicker;
