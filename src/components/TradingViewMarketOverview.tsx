import { useEffect, useRef } from 'react';

const TradingViewMarketOverview = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      dateRange: "1D",
      showChart: true,
      locale: "en",
      width: "100%",
      height: "100%",
      largeChartUrl: "",
      isTransparent: false,
      showSymbolLogo: true,
      showFloatingTooltip: true,
      plotLineColorGrowing: "rgba(18, 88, 202, 1)",
      plotLineColorFalling: "rgba(239, 68, 68, 1)",
      gridLineColor: "rgba(240, 243, 250, 1)",
      scaleFontColor: "rgba(106, 109, 120, 1)",
      belowLineFillColorGrowing: "rgba(18, 88, 202, 0.12)",
      belowLineFillColorFalling: "rgba(239, 68, 68, 0.12)",
      belowLineFillColorGrowingBottom: "rgba(18, 88, 202, 0)",
      belowLineFillColorFallingBottom: "rgba(239, 68, 68, 0)",
      symbolActiveColor: "rgba(18, 88, 202, 0.12)",
      tabs: [
        {
          title: "Forex",
          symbols: [
            { s: "FOREXCOM:EURUSD", d: "EUR/USD" },
            { s: "FOREXCOM:GBPUSD", d: "GBP/USD" },
            { s: "FOREXCOM:USDJPY", d: "USD/JPY" },
            { s: "FOREXCOM:AUDUSD", d: "AUD/USD" }
          ],
          originalTitle: "Forex"
        },
        {
          title: "Commodities",
          symbols: [
            { s: "TVC:GOLD", d: "Gold" },
            { s: "TVC:SILVER", d: "Silver" },
            { s: "TVC:USOIL", d: "Crude Oil" }
          ],
          originalTitle: "Commodities"
        },
        {
          title: "Indices",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
            { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
            { s: "FOREXCOM:DJI", d: "Dow Jones" }
          ],
          originalTitle: "Indices"
        }
      ]
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="rounded-xl overflow-hidden bg-white border border-border h-[420px] shadow-sm">
      <div className="tradingview-widget-container h-full" ref={containerRef}>
        <div className="tradingview-widget-container__widget h-full"></div>
      </div>
    </div>
  );
};

export default TradingViewMarketOverview;
