import FirstThreeOffers from "@/components/Main/firstThreeOffers";
import MainOffer from "@/components/Main/mainOffer";

const Home = async () => {
  return (
    <main className="w-full flex justify-center items-center flex-col gap-12 mt-4 mb-8">
      <div className=" h-80 w-full rounded-lg">
        <MainOffer />
      </div>

      <div className="self-start ml-16 font-bold text-xl text-mainBg underline">
        <a href="/items">View all items</a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-16">
        <FirstThreeOffers index={1} />
        <FirstThreeOffers index={4} />
        <FirstThreeOffers index={5} />
      </div>
    </main>
  );
};

export default Home;
