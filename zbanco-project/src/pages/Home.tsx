import CryptoSection from "../components/pages/home/crypto/CryptoSection";
import TransferHistorySection from "../components/pages/home/transfer-history/TransferHistorySection";
import TransferSection from "../components/pages/home/TransferSection";

const Home = () => {
  return (
    <div className="flex flex-col gap-5 sm:gap-10 w-full h-full">
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-10">
        <TransferSection />
        <CryptoSection />
      </div>
      <TransferHistorySection />
    </div>
  );
};

export default Home;