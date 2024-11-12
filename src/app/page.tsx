import { MainPage } from "@/components/pages/Home/MainPage";

const Home = async () => {
  return (
    <main className="container mx-auto flex justify-center items-center flex-col  shadow-md gap-8 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-6 rounded-lg pb-10">
      <MainPage />
    </main>
  );
};

export default Home;
