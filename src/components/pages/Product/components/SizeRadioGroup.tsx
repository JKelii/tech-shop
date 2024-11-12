import { Input } from "@/components/ui/input";
import { useSelectedProductQuantity } from "../hooks/useSelectedProductQuantity";
import { Label } from "@/components/ui/label";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";

export type ProductType = {
  size: Array<{
    productVariantSize: Array<{
      name?: string | null;
      productQuantity: Array<number>;
    }>;
  }>;
};

export type SizeRadioGroupProps = {
  product: ProductType;
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
  register: UseFormRegister<{
    RadioGroup: string;
  }>;
  errors: FieldErrors<{
    RadioGroup: string;
  }>;
  trigger: UseFormTrigger<{
    RadioGroup: string;
  }>;
  setValue: UseFormSetValue<{
    RadioGroup: string;
  }>;
};

const options = ["128GB", "256GB", "512GB", "1TB"];

export const SizeRadioGroup = ({
  register,
  product,
  selectedSize,
  onSizeSelect,
  errors,
  trigger,
  setValue,
}: SizeRadioGroupProps) => {
  const { selectedProductQuantity, onSelectedProductQuantity } =
    useSelectedProductQuantity();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value;
    onSizeSelect(size);
    setValue("RadioGroup", size, { shouldValidate: true });
    trigger("RadioGroup");
  };

  const sizes = product.size[0].productVariantSize.map((size) => size.name);
  const isOptionSize = sizes.some((size) => options.includes(size as string));
  {
    isOptionSize ? "Memory Storage:" : "Size:";
  }
  //TODO: HTMLFORM refactor, category
  return (
    <div className="flex flex-col gap-2 mb-4">
      <Label className="text-lg font-bold">
        {isOptionSize ? "Memory Storage:" : "Size:"}
      </Label>
      <div className="flex justify-start items-center gap-2">
        {sizes &&
          sizes.map((size) => (
            <Label key={size} className={`flex-1 cursor-pointer`}>
              <Input
                {...register("RadioGroup")}
                type="radio"
                name="size"
                value={size || ""}
                checked={selectedSize === size}
                onChange={handleChange}
                className="sr-only"
              />
              <span
                className={`flex justify-center items-center text-center py-2 h-10 px-2 w-10 border rounded-md transition-colors ${
                  selectedSize === size
                    ? "bg-black text-primary-foreground border-primary "
                    : "bg-background text-foreground border-input hover:bg-accent hover:text-accent-foreground"
                } ${
                  size === "Standard" ? "w-32 text-semibold tracking-wide" : ""
                }
              ${size === "128GB" ? "w-16 text-semibold tracking-wide" : ""}
               ${size === "256GB" ? "w-16  text-semibold tracking-wide" : ""}
                ${size === "512GB" ? "w-16  text-semibold tracking-wide" : ""}
              `}
              >
                {size}
              </span>
            </Label>
          ))}
      </div>
      <p className="text-red-500 h-2">{errors.RadioGroup?.message}</p>
      <p className="text-sm text-muted-foreground h-[20px]">
        {selectedProductQuantity && selectedProductQuantity > 0
          ? `Left in stock: ${selectedProductQuantity}`
          : selectedProductQuantity === 0 && "Out of stock"}
      </p>
    </div>
  );
};
