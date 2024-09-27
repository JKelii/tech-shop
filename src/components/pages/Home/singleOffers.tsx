import { getAllProducts } from "@/lib";
import ProductsPagination from "../Product/components/ProductsPagination";

const SingleOffers = async () => {
  const { products } = await getAllProducts();

  return (
    <main className="flex justify-center flex-wrap items-center w-full border-2 border-gray-400 rounded-lg p-16">
      <div className="w-full">
        <ProductsPagination products={products} />
      </div>
    </main>
  );
};

export default SingleOffers;
