import { MainPage } from "@/components/pages/Home/MainPage";

const Home = () => {
  return (
    <main className="container mx-auto mb-8 mt-4 flex min-w-[400px] flex-col  items-center justify-center gap-8 rounded-lg border-2 border-gray-200 bg-gray-100/50 pb-10 pt-6 shadow-md">
      <MainPage />
    </main>
  );
};

export default Home;
