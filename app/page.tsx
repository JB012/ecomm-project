"use client"
import Header from "./components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import BestSellers from "./components/BestSellers";
export default function Home() {
  // To prevent a hydration mismatch. 
  const [isClient, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);
  
  return (
    <>
      { isClient && <div className="flex w-full flex-col">
        <Header />     
        <div className="h-120">
          <Image src={'/image1.jpg'} alt={'Header Image'} width={0} height={0} sizes="100vw" style={{width: "100%", height: "100%", objectFit: 'cover'}}/>
        </div>
        
        <BestSellers />
      </div>}
    </>
  );
}
