import AddToCartButton from "@/components/addToCartButton";
import { WishList } from "@/components/WishList";
import { ProductType } from "../ProductPage";
import { manageCart } from "@/actions/cart";

type ProductManagementProps = {
  product: ProductType;
  favoriteId: string | undefined;
  productQuantity: number;
};

export const ProductManagement = ({
  product,
  favoriteId,
  productQuantity,
}: ProductManagementProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end items-end ">
        <AddToCartButton
          slug={product.slug}
          name={product.name}
          image={product.images[0]?.url}
          price={product.price}
          productQuantity={productQuantity}
        />
        <WishList
          favoriteId={favoriteId}
          id={product.id}
          slug={product.slug}
          name={product.name}
          image={product.images[0]?.url}
          price={product.price}
        />
      </div>
    </div>
  );
};
