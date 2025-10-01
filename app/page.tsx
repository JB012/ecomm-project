'use client'
import { useState, useEffect } from "react";
import BestSellers from "./components/BestSellers";
import ByCategory from "./components/ByCategory";
import HeaderPhoto from "./components/HeaderPhoto";
import { ProductObject } from "./types/ProductObject";
import { getOrigin } from "./lib/data";

export default function Home() {
  const [products, setProducts] = useState(Array<ProductObject>);

  useEffect(() => {
    fetch(`${getOrigin(window.location.origin)}/api/products`).then(res => res.json()).then(data => setProducts(data.products));
  }, []);

  return (
    <>
    { products.length !== 0 &&
    <div className="flex w-full flex-col">
      <HeaderPhoto />
      <BestSellers products={products} />
      <ByCategory />
    </div>
    }
    </>
  );
}
