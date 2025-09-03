'use client'
import Header from "./components/Header";
import { useState, useEffect } from "react";
import BestSellers from "./components/BestSellers";
import ByCategory from "./components/ByCategory";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";
import HeaderPhoto from "./components/HeaderPhoto";
import { ProductObject } from "./types/ProductObject";

export default function Home() {

  const [products, setProducts] = useState(Array<ProductObject>);
  useEffect(() => {
    const data = localStorage.getItem('products');
    if (data === null) {
      fetch('https://dummyjson.com/products').then(res => res.json()).then(data => {localStorage.setItem('products',JSON.stringify(data['products'])); setProducts(data['products']);});
    }
    else {
      setProducts(JSON.parse(data));
    }
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
