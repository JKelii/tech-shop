import { useContext } from "react";
import { ShopContext } from "../contexts/shopContextProvider";

const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === undefined)
    throw new Error("Your component is not wrapped as children");
  return context;
};

export default useShopContext;
