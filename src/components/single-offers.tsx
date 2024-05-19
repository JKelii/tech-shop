import { getAllProducts } from "@/lib";

const SingleOffers = async () => {
  const { products } = await getAllProducts();
  return (
    <main className="flex justify-around items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-16">
        <article className="bg-mainBg size-64 rounded-md flex justify-center items-center">
          <ul>
            {products.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </article>
      </div>
    </main>
  );
};

export default SingleOffers;
