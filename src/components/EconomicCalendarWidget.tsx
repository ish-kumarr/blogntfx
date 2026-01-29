import { useEffect, useRef } from 'react';

const EconomicCalendarWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-events.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      isTransparent: false,
      width: "100%",
      height: "100%",
      locale: "en",
      importanceFilter: "0,1",
      currencyFilter: "USD,EUR,GBP,JPY,AUD,CAD,CHF,NZD"
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-border h-[400px] shadow-sm">
      <div className="p-4 border-b border-border bg-white">
        <h3 className="text-lg font-semibold text-foreground">Economic Calendar</h3>
        <p className="text-xs text-muted-foreground mt-1">High-impact events this week</p>
      </div>
      <div className="tradingview-widget-container h-[calc(100%-60px)]" ref={containerRef}>
        <div className="tradingview-widget-container__widget h-full"></div>
      </div>
    </div>
  );
};

export default EconomicCalendarWidget;
