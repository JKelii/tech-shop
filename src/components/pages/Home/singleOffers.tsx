import { getAllProducts } from "@/lib";
import Image from "next/image";
import { priceUpdate } from "@/utils/priceUpdate";
import Link from "next/link";

const SingleOffers = async () => {
  const { products } = await getAllProducts();

  return (
    <main className="flex justify-center flex-wrap items-center w-full border-2 border-gray-400 rounded-lg p-16">
      <div className="grid min-w-[320px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-24 lg:gap-20">
        {products.map((product) => (
          <Link href={`/item/${product.slug}`} key={product.id}>
            <span className="w-full h-full">
              <article className="border-[1px] border-gray-500  hover:border-slate-700 size-80 rounded-md gap-2 flex justify-center items-center flex-col hover:translate-y-[-3px] transition">
                <Image
                  src={product.images[0]?.url}
                  alt={product.name}
                  width={150}
                  height={150}
                />
                <p className="font-semibold self-start ml-4">{product.name}</p>
                <p className="text-sm self-start ml-4 text-muted-foreground">
                  {product.description}
                </p>
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
