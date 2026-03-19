import { useEffect, useState, useRef } from 'react';
import showToast from '../components/toast/showToast';
import { useTranslation } from 'react-i18next';

interface CryptoUpdate {
  price: number;
  change: number;
  direction: 'up' | 'down' | 'stable';
}

interface CryptoDataMap {
  [symbol: string]: CryptoUpdate;
}

export const useCryptoWebsocket = (symbols: string[]) => {
  const { t } = useTranslation();
  const [cryptoData, setCryptoData] = useState<CryptoDataMap>({});
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_FINNHUB_KEY;
    if (!apiKey) {
      console.error("Finnhub API Key missing");
      return;
    }

    const ws = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);
    socket.current = ws;

    ws.onopen = () => {
      symbols.forEach(symbol => {
        ws.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
    };

    ws.onmessage = (event: MessageEvent) => {
      const response = JSON.parse(event.data);
      if (response.type !== 'trade' || !response.data) return;

      const lastTrade = response.data[response.data.length - 1];
      const { s: symbol, p: price } = lastTrade;

      setCryptoData(prev => {
        const currentItem = prev[symbol];
        const previousPrice = currentItem?.price;

        let direction: 'up' | 'down' | 'stable' = currentItem?.direction || 'stable';

        if (previousPrice !== undefined) {
          if (price > previousPrice) direction = 'up';
          else if (price < previousPrice) direction = 'down';
        }

        return {
          ...prev,
          [symbol]: {
            price,
            change: previousPrice !== undefined ? price - previousPrice : 0,
            direction
          }
        };
      });
    };

    ws.onerror = () => {
      setTimeout(() => {
        if (!socket.current || socket.current.readyState !== 1) {
          showToast("error", t("toast.crypto.webSocketError"));
        }
      }, 3000);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    };
  }, [symbols, t]);

  return { cryptoData };
};