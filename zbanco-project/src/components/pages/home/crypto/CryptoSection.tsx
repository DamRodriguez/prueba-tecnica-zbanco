import React, { useEffect, useState, useRef, useMemo } from 'react';
import BaseContainer from '../../../../other/BaseContainer';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import MotionStagger from '../../../motion/MotionStagger';

interface CryptoUpdate {
  price: number;
  change: number;
  direction: 'up' | 'down' | 'stable';
}

interface CryptoDataMap {
  [symbol: string]: CryptoUpdate;
}

const CryptoSection: React.FC = () => {
  const { t } = useTranslation();
  const [cryptoData, setCryptoData] = useState<CryptoDataMap>({});

  const socket = useRef<WebSocket | null>(null);

  const symbols = useMemo(() => [
    'BINANCE:BTCUSDT',
    'BINANCE:ETHUSDT',
    'BINANCE:BNBUSDT',
    'BINANCE:SOLUSDT',
    'BINANCE:ADAUSDT',
    'BINANCE:DOTUSDT'
  ], []);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_FINNHUB_KEY;

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

    return () => {
      if (socket.current) {
        socket.current.close();
        socket.current = null;
      }
    };
  }, [symbols]);

  return (
    <BaseContainer
      title={t("pages.home.crypto.title")}
      className="w-full"
    >
      <div className="border border-soft-gray rounded-md overflow-hidden">

        <div className="grid grid-cols-3 px-6 py-4 text-sm sm:text-base font-semibold text-medium-gray shadow-s1 bg-blue-dark/10">
          <p className="truncate">
            {t("pages.home.crypto.table.titles.crypto")}
          </p>
          <p className="truncate">
            {t("pages.home.crypto.table.titles.price")}
          </p>
          <p className="truncate">
            {t("pages.home.crypto.table.titles.change")}
          </p>
        </div>

        <MotionStagger className="divide-y divide-soft-gray">
          {symbols.map(symbol => {
            const data = cryptoData[symbol];
            const isUp = data?.direction === 'up';
            const isDown = data?.direction === 'down';

            return (
              <div key={symbol} className="grid grid-cols-3 px-6 py-5">
                <div className="font-bold flex items-center text-sm sm:text-base">
                  {symbol.split(':')[1]}
                </div>

                <div className="text-black font-semibold flex items-center text-sm sm:text-base">
                  {data ? `$${data.price.toFixed(2)}` : '---'}
                </div>

                <div className={clsx("text-sm sm:text-base w-[3.5rem] sm:w-[4rem] flex justify-center items-center px-2 py-1 rounded-md text-white", {
                  "bg-green": isUp,
                  "bg-red-error": isDown,
                  "bg-soft-gray": !isUp && !isDown
                })}>
                  {data ? `${isUp ? '+' : ''}${data.change.toFixed(2)}` : '--'}
                </div>
              </div>
            );
          })}
        </MotionStagger>
      </div>
    </BaseContainer>
  );
};

export default CryptoSection;