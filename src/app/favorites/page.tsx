"use client";
import useShopContext from "@/hooks/useShopContext";
import React from "react";

const FavoritesPage = () => {
  const { wishlist } = useShopContext();
  return (
    <main className="min-h-screen">
      <h2>Hej</h2>
      {wishlist?.map((item, index) => (
        <div key={index}>
          <h1>{item.name}</h1>
        </div>
      ))}
    </main>
  );
};

export default FavoritesPage;
