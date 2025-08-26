"use client"
import Image from "next/image"
import { useEffect, useState } from "react";

export default function HeaderPhoto() {
    const [number, setNumber] = useState(Math.floor(Math.random() * 13 + 1));

    return (
        <div className="w-full h-120 relative">
            <div className="flex h-full flex-col text-black w-full px-12 gap-6 z-10 font-medium justify-center absolute">
                <div className="text-7xl">Shop Now!</div>
                <div className="text-5xl">Order the latest items with hot deals</div>
                <button className="self-end">Shop All</button>
            </div>
            <Image src={`/image${number}.jpg`} className="opacity-75" alt={'Header Image'} width={0} height={0} sizes="100vw" style={{width: "100%", height: "100%", objectFit: 'cover'}}/>
        </div>
    )
}