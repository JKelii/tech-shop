import MainOffer from "@/components/pages/Home/mainOffer";
import { CarouselSize } from "@/components/pages/Home/Carousel";
import ProductOffer from "@/components/pages/Home/ProductOffer";

const Home = async () => {
  //TODO: Change structure of folders
  return (
    <main className="container mx-auto flex justify-center items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <div className="h-full w-full rounded-lg ">
        <MainOffer />
      </div>
      <CarouselSize />

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
        <ProductOffer index={1} />
        <ProductOffer index={4} />
        <ProductOffer index={5} />
        <ProductOffer index={2} />
        <ProductOffer index={6} />
        <ProductOffer index={0} />
      </div>
    </main>
  );
};

export default Home;
