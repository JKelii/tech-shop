import { SizeRadioGroup } from "./SizeRadioGroup";
import SelectQuantity from "./SelectQuantity";
import AddToCartButton from "@/components/addToCartButton";
import { WishList } from "@/components/WishList";
import { ProductType } from "../ProductPage";
import { manageCart } from "@/actions/cart";

type ProductManagementProps = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  product: ProductType;
  favoriteId: string | undefined;
};

export const ProductManagement = ({
  quantity,
  setQuantity,
  product,
  favoriteId,
}: ProductManagementProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex">
        <AddToCartButton
          manageCart={manageCart}
          quantity={quantity}
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
