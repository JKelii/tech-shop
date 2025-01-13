import { useSelectedProductQuantity } from "../hooks/useSelectedProductQuantity";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type {
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
  const { selectedProductQuantity } = useSelectedProductQuantity();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = e.target.value;
    onSizeSelect(size);
    setValue("RadioGroup", size, { shouldValidate: true });
    await trigger("RadioGroup");
  };

  const sizes = product.size[0].productVariantSize.map((size) => size.name);
  const isOptionSize = sizes.some((size) => options.includes(size as string));

  return (
    <div className="mb-4 flex flex-col">
      <Label className="text-lg font-bold">
        {isOptionSize ? "Memory Storage:" : "Size:"}
      </Label>
      <div className="flex items-center justify-start gap-2">
        {sizes.map((size) => (
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
              className={`flex size-10 items-center justify-center rounded-md border p-2 text-center transition-colors ${
                selectedSize === size
                  ? "border-primary bg-black text-primary-foreground "
                  : "border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              } ${size === "Standard" ? "text-semibold w-32 tracking-wide" : ""}
              ${size === "128GB" ? "text-semibold w-16 tracking-wide" : ""}
               ${size === "256GB" ? "text-semibold  w-16 tracking-wide" : ""}
                ${size === "512GB" ? "text-semibold  w-16 tracking-wide" : ""}
              `}
            >
              {size}
            </span>
          </Label>
        ))}
      </div>
      <p className="h-2 text-red-500">{errors.RadioGroup?.message}</p>
      <p className="h-[20px] text-sm text-muted-foreground">
        {selectedProductQuantity && selectedProductQuantity > 0
          ? `Left in stock: ${selectedProductQuantity}`
          : selectedProductQuantity === 0 && "Out of stock"}
      </p>
    </div>
  );
};
