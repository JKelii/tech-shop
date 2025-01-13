import { getServerSession } from "next-auth";

import { FavoritesList } from "@/components/pages/Favorites/FavoritesList";

import { getFavorites } from "@/lib";

const FavoritesPage = async () => {
  const session = await getServerSession();

  const favoriteProducts = await getFavorites({ email: session?.user?.email });

  return (
    <main className="container mx-auto mb-8 mt-4 flex min-w-[400px] grow flex-col items-center justify-start gap-12 rounded-lg border-2 border-gray-200 bg-gray-100/50 py-10 shadow-md">
      <h2 className="text-2xl font-bold text-black">Wishlist</h2>
      <p className="text-sm text-muted-foreground">
        The Wishlist component allows users to curate a personalized collection
        of products they are interested in purchasing.{" "}
      </p>

      <FavoritesList favoriteProducts={favoriteProducts} />
    </main>
  );
};

export default FavoritesPage;
