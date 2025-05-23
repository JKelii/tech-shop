import { SlidersHorizontal } from "lucide-react";

import ProductsList from "../Product/components/ProductsList";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { getAllProducts, getCategories } from "@/lib";

const SingleOffers = async () => {
  const { products } = await getAllProducts();
  const selectedCategories = await getCategories();

  return (
    <main className="flex w-full flex-wrap items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-100/50 p-16">
      <div className="w-full">
        <Card className="mb-8 w-full p-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center justify-center gap-2">
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
