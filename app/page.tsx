"use client"
import Header from "./components/Header";
import { useState, useEffect } from "react";
import BestSellers from "./components/BestSellers";
import ByCategory from "./components/ByCategory";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";
import HeaderPhoto from "./components/HeaderPhoto";

export default function Home() {
  // To prevent a hydration mismatch. 
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  
  return (
    <>
      { isClient && 
      <div className="flex w-full flex-col">
        <HeaderPhoto />
        <BestSellers />
        <ByCategory />
        <NewsLetter />
      </div>
      }
    </>
  );
}
