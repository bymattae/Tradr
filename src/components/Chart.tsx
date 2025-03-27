'use client';

import { useState, useEffect, useRef } from 'react';
import type { 
  ChartOptions,
  DeepPartial,
  IChartApi,
  Time,
  SeriesOptionsMap,
  CandlestickData,
  LineData,
  SeriesType,
  ISeriesApi,
  SeriesMarker,
  HistogramData,
  SingleValueData,
  CandlestickStyleOptions,
  LineStyleOptions,
  HistogramStyleOptions
} from 'lightweight-charts';

interface ChartProps {
  data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  showResult: boolean;
  isCorrect?: boolean;
  timeFrame?: '4H' | '1D' | '1W';
  onTimeFrameChange?: (timeFrame: '4H' | '1D' | '1W') => void;
  decisionPrice?: number;
  decisionIndex?: number;
  isReplayComplete?: boolean;
}

type SeriesDataType<T extends keyof SeriesOptionsMap> = 
  T extends 'Candlestick' ? CandlestickData :
  T extends 'Line' ? LineData :
  T extends 'Histogram' ? HistogramData :
  SingleValueData;

export function Chart({ 
  data, 
  showResult, 
  isCorrect,
  timeFrame = '4H',
  decisionPrice,
  decisionIndex,
  isReplayComplete = false
}: ChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ from: 0, to: Math.floor(data.length / 2) });
  const [hoveredPrice, setHoveredPrice] = useState<number | null>(null);
  const [hoveredTime, setHoveredTime] = useState<string | null>(null);

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current || typeof window === 'undefined') return;

    const initChart = async () => {
      const { createChart, CandlestickSeries, LineSeries, HistogramSeries } = await import('lightweight-charts');
      
      // Ensure container has dimensions
      if (!chartContainerRef.current) return;
      const container = chartContainerRef.current;
      container.style.width = '100%';
      container.style.height = '100%';
      
      const chart = createChart(container, {
        layout: {
          background: { color: '#ffffff' },
          textColor: '#333',
        },
        grid: {
          vertLines: { color: '#f0f0f0' },
          horzLines: { color: '#f0f0f0' },
        },
        width: container.clientWidth,
        height: container.clientHeight,
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
          borderColor: '#f0f0f0',
          rightOffset: 5,
          barSpacing: 12,
          fixLeftEdge: true,
          fixRightEdge: true,
          lockVisibleTimeRangeOnResize: true,
        },
        rightPriceScale: {
          visible: true,
          borderColor: '#f0f0f0',
          scaleMargins: {
            top: 0.1,
            bottom: 0.2,
          },
        },
        crosshair: {
          mode: 1,
          vertLine: {
            width: 1,
            color: '#758696',
            style: 3,
          },
          horzLine: {
            width: 1,
            color: '#758696',
            style: 3,
          },
        },
        handleScroll: {
          mouseWheel: true,
          pressedMouseMove: true,
          horzTouchDrag: true,
          vertTouchDrag: true,
        },
        handleScale: {
          mouseWheel: true,
          pinch: true,
          axisPressedMouseMove: true,
        },
      } as DeepPartial<ChartOptions>);

      // Force a resize after a short delay to ensure proper dimensions
      setTimeout(() => {
        if (container) {
          chart.applyOptions({
            width: container.clientWidth,
            height: container.clientHeight,
          });
        }
      }, 100);

      // Add candlestick series
      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: '#22c55e',
        downColor: '#ef4444',
        borderVisible: false,
        wickUpColor: '#22c55e',
        wickDownColor: '#ef4444',
      });

      // Add entry price line
      const entryPriceLine = chart.addSeries(LineSeries, {
        color: '#000',
        lineWidth: 3,
        title: 'ENTRY',
        lastValueVisible: true,
        priceLineVisible: true,
        priceLineWidth: 3,
        priceLineColor: '#000',
        priceLineStyle: 1,
        crosshairMarkerVisible: true,
        crosshairMarkerRadius: 6,
      });

      // Add volume histogram
      const volumeSeries = chart.addSeries(HistogramSeries, {
        color: '#26a69a',
        priceFormat: {
          type: 'volume',
        },
        priceScaleId: 'volume', // Create a separate scale for volume
      });

      // Configure the volume scale
      chart.applyOptions({
        priceScale: {
          volume: {
            scaleMargins: {
              top: 0.8,
              bottom: 0,
            },
            visible: true,
            borderColor: '#f0f0f0',
          },
        },
      } as DeepPartial<ChartOptions>);

      // Format data for the chart
      const chartData = data.map(d => ({
        time: d.time as Time,
        open: d.open,
        high: d.high,
        low: d.low,
        close: d.close,
      })) as CandlestickData[];

      // Calculate volume data (using price range as mock volume)
      const volumeData = data.map(d => ({
        time: d.time as Time,
        value: Math.abs(d.high - d.low) * 1000,
        color: d.close > d.open ? '#22c55e' : '#ef4444',
      })) as HistogramData[];

      // Set the data
      candlestickSeries.setData(chartData.slice(0, visibleRange.to));
      volumeSeries.setData(volumeData.slice(0, visibleRange.to));

      // If we have a decision price, add the horizontal line
      if (decisionPrice && decisionIndex) {
        // Create entry line data only up to the decision point
        const entryLineData = chartData.slice(0, decisionIndex + 1).map(d => ({
          time: d.time as Time,
          value: decisionPrice,
        })) as LineData[];

        entryPriceLine.setData(entryLineData);

        // Add a vertical line at the entry point
        const verticalLine = chart.addSeries(LineSeries, {
          color: '#000',
          lineWidth: 3,
          lineStyle: 2, // Dashed line
          title: 'YOUR ENTRY!',
          lastValueVisible: false,
          priceLineVisible: false,
        });

        // Create vertical line data
        const verticalLineData = [
          { time: chartData[decisionIndex].time, value: chartData[decisionIndex].low },
          { time: chartData[decisionIndex].time, value: chartData[decisionIndex].high }
        ] as LineData[];

        verticalLine.setData(verticalLineData);

        // Add a custom HTML marker
        const markerElement = document.createElement('div');
        markerElement.className = 'entry-marker';
        markerElement.innerHTML = `
          <div class="entry-marker-content">
            <div class="entry-marker-line"></div>
            <div class="entry-marker-label">YOUR ENTRY!</div>
          </div>
        `;
        container.appendChild(markerElement);

        // Position the marker at the center of the visible range
        const updateMarkerPosition = () => {
          const rect = container.getBoundingClientRect();
          if (rect) {
            markerElement.style.position = 'absolute';
            markerElement.style.left = '50%';
            markerElement.style.top = '0';
            markerElement.style.transform = 'translateX(-50%)';
          }
        };

        // Update marker position on resize
        window.addEventListener('resize', updateMarkerPosition);

        // Initial position
        updateMarkerPosition();
      }

      // Set visible range to show only half the candles initially
      const midPoint = Math.floor(chartData.length / 2);
      chart.timeScale().setVisibleLogicalRange({
        from: 0,
        to: midPoint,
      });

      // Subscribe to crosshair move to update tooltip
      chart.subscribeCrosshairMove(param => {
        if (param.point) {
          const price = param.seriesData.get(candlestickSeries) as CandlestickData;
          if (price) {
            setHoveredPrice(price.close);
            setHoveredTime(price.time as string);
          }
        } else {
          setHoveredPrice(null);
          setHoveredTime(null);
        }
      });

      // Store chart reference
      chartRef.current = chart;
      setMounted(true);

      // Handle resize
      const handleResize = () => {
        if (container) {
          chart.applyOptions({
            width: container.clientWidth,
            height: container.clientHeight,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        chart.remove();
      };
    };

    initChart();
  }, [data, visibleRange.from, visibleRange.to, decisionPrice, decisionIndex]);

  // Handle showing result
  useEffect(() => {
    if (!chartRef.current || !showResult || !mounted) return;

    let currentIndex = visibleRange.to;
    const interval = setInterval(() => {
      if (currentIndex >= data.length) {
        clearInterval(interval);
        return;
      }

      // Update visible range to show new candle
      setVisibleRange(prev => ({
        from: prev.from,
        to: currentIndex + 1,
      }));

      // Smoothly scroll the chart to the right
      chartRef.current?.timeScale().scrollToPosition(1, false);

      currentIndex++;
    }, 200);

    return () => clearInterval(interval);
  }, [showResult, data.length, mounted]);

  if (!mounted) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col">
      <style jsx global>{`
        .entry-marker {
          pointer-events: none;
          z-index: 1000;
        }
        .entry-marker-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .entry-marker-line {
          width: 2px;
          height: 60px;
          background: linear-gradient(to bottom, #000 50%, transparent 50%);
          background-size: 2px 4px;
        }
        .entry-marker-label {
          background: #000;
          color: white;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 14px;
          font-weight: bold;
          margin-top: 4px;
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }
        }
      `}</style>
      <div className="flex-1 relative w-full h-full">
        {/* Background color transition for result */}
        <div 
          className={`absolute inset-0 transition-colors duration-500 ${
            showResult && isReplayComplete ? (isCorrect ? 'bg-green-50' : 'bg-red-50') : 'bg-white'
          }`}
        />

        {/* Chart Container */}
        <div 
          ref={chartContainerRef} 
          className="absolute inset-0 w-full h-full"
          style={{ minHeight: '400px' }}
        />

        {/* Tooltip */}
        {hoveredPrice && hoveredTime && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-lg px-4 py-2 pointer-events-none z-50">
            <div className="text-sm font-medium text-gray-900">
              Price: ${hoveredPrice.toFixed(2)}
            </div>
            <div className="text-xs text-gray-500">
              Time: {new Date(hoveredTime).toLocaleTimeString()}
            </div>
          </div>
        )}

        {/* Result Overlay */}
        {showResult && isReplayComplete && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className={`text-6xl transform transition-all duration-500 ${
              isCorrect ? 'scale-150 rotate-12' : 'scale-100 -rotate-12'
            }`}>
              {isCorrect ? '🎯' : '😢'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 