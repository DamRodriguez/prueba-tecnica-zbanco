import TransferHistorySection from "../components/pages/home/TransferHistorySection";
import TransferSection from "../components/pages/home/TransferSection";

const Home = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      <TransferSection />
      <TransferHistorySection />
    </div>
  );
};

export default Home;