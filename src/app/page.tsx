import FirstThreeOffers from "@/components/pages/Home/firstThreeOffers";
import MainOffer from "@/components/pages/Home/mainOffer";
import { MainCarousel } from "@/components/pages/Home/MainCarousel";

const Home = async () => {
  //TODO: Change structure of folders
  return (
    <main className="w-full flex justify-center items-center flex-col gap-12 mt-4 mb-8">
      <div className=" h-full w-full rounded-lg">
        <MainOffer />
      </div>
      <MainCarousel />
      <div className="flex justify-between w-full font-bold text-xl ">
        <h3 className="text-3xl font-bold">Featured Products</h3>
        <a
          href="/items"
          className="border-2 border-gray-200 p-1 rounded-md shadow-md hover:translate-y-[2px] transition"
        >
          View all items
        </a>
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
