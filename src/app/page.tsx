import MainOffer from "@/components/main-offer";
import SingleOffers from "@/components/single-offers";

const Home = async () => {
  return (
    <main className="w-full flex justify-center items-center flex-col gap-12 mt-4 mb-8">
      <div className="bg-mainBg h-[25rem] w-full rounded-lg mt-2 flex flex-col justify-center items-center">
        <div className="bg-gray-200 h-80 w-[80%] rounded-lg ">
          <MainOffer />
        </div>
      </div>
      <SingleOffers />
    </main>
  );
};

export default Home;
