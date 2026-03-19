import { useMemo } from 'react';
import BaseContainer from '../../../../other/BaseContainer';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import MotionStagger from '../../../motion/MotionStagger';
import { useCryptoWebsocket } from '../../../../hooks/useCryptoWebsocket';

const CryptoSection: React.FC = () => {
  const { t } = useTranslation();

  const symbols = useMemo(() => [
    'BINANCE:BTCUSDT',
    'BINANCE:ETHUSDT',
    'BINANCE:BNBUSDT',
    'BINANCE:SOLUSDT',
    'BINANCE:ADAUSDT',
    'BINANCE:DOTUSDT'
  ], []);

  const { cryptoData } = useCryptoWebsocket(symbols);

  return (
    <BaseContainer
      title={t("pages.home.crypto.title")}
      className="w-full"
    >
      <div className="border border-soft-gray rounded-md overflow-hidden">

        <div className="grid grid-cols-3 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base gap-2 font-semibold text-medium-gray shadow-s1 bg-blue-dark/10">
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
              <div key={symbol} className="grid grid-cols-3 px-3 sm:px-6 py-3 sm:py-4 items-center gap-2">
                <div className="font-bold text-xs sm:text-base truncate min-w-0">
                  {symbol.split(':')[1]}
                </div>

                <div className="text-black font-semibold text-xs sm:text-base truncate min-w-0">
                  {data ? `$${data.price.toFixed(2)}` : '--'}
                </div>

                <div className={clsx("text-xs sm:text-base w-[3rem] sm:w-[4rem] flex justify-center items-center px-2 py-1 rounded-md text-white truncate min-w-0", {
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