import { getAllProducts } from "@/lib";
import Image from "next/image";
import { priceUpdate } from "@/utils/priceUpdate";
import Link from "next/link";

const SingleOffers = async () => {
  const { products } = await getAllProducts();

  return (
    <main className="flex justify-around items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 lg:gap-16">
        {products.map((product) => (
          <Link href={`/item/${product.slug}`} key={product.id}>
            <span className="w-full h-full">
              <article className="border-2 border-gray-500  hover:border-slate-700 size-80 rounded-md flex justify-center items-center flex-col">
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  width={150}
                  height={150}
                />
                <p className="font-semibold self-start ml-4">{product.name}</p>
                <p className="text-sm self-start ml-4">{product.description}</p>
                <p className="font-bold self-start ml-4">
                  {" "}
                  {priceUpdate(product.price)}
                </p>
              </article>
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default SingleOffers;
