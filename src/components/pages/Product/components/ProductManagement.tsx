import AddToCartButton from "@/components/addToCartButton";
import { WishList } from "@/components/WishList";
import { ProductType } from "../ProductPage";
import { manageCart } from "@/actions/cart";

type ProductManagementProps = {
  product: ProductType;
  favoriteId: string | undefined;
};

export const ProductManagement = ({
  product,
  favoriteId,
}: ProductManagementProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <AddToCartButton
          slug={product.slug}
          name={product.name}
          image={product.images[0]?.url}
          price={product.price}
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
