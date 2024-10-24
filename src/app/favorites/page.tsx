import { getServerSession } from "next-auth";
import { getFavorites } from "@/lib";
import { FavoritesList } from "@/components/pages/Favorites/FavoritesList";

const FavoritesPage = async () => {
  const session = await getServerSession();

  // const favoriteProducts = await getFavorites({ email: session?.user?.email });
  const favoriteProducts = await getFavorites({ email: session?.user?.email });
  //TODO: Products can be added twice
  return (
    <main className=" min-h-screen container mx-auto flex justify-start items-center flex-col  shadow-md gap-12 mt-4 mb-8 bg-gray-100/50 border-2 border-gray-200 pt-10 rounded-lg pb-10">
      <h2 className="text-black font-bold text-2xl">Wishlist</h2>
      <p className="text-sm text-muted-foreground">
        The Wishlist component allows users to curate a personalized collection
        of products they are interested in purchasing.{" "}
      </p>

      <FavoritesList favoriteProducts={favoriteProducts} />
    </main>
  );
};

export default FavoritesPage;
