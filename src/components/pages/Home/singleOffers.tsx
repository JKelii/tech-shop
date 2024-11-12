import { getAllProducts, getCategories } from "@/lib";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import ProductsList from "../Product/components/ProductsList";

const SingleOffers = async () => {
  const { products } = await getAllProducts();
  const selectedCategories = await getCategories();

  return (
    <main className="flex justify-center flex-wrap items-center w-full border-2 border-gray-300 bg-gray-100/50 rounded-lg p-16">
      <div className="w-full">
        <Card className="mb-8 p-8 w-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex justify-center items-center gap-2">
                <SlidersHorizontal /> Filters
              </CardTitle>
            </div>
          </CardHeader>
          <ProductsList
            products={products}
            selectedCategories={selectedCategories}
          />
        </Card>
      </div>
    </main>
  );
};

export default SingleOffers;
