"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HeaderPhoto() {
    const [host, setHost] = useState("");

    useEffect(() => {
        if (host === "") {
            setHost(window.location.origin);
        }
    }, [host]);

    return (
        <div className="w-full h-120 relative">
            <div className="flex h-full flex-col text-black w-full px-12 gap-6 z-10 font-medium justify-center absolute">
                <div className="text-7xl">Shop Now!</div>
                <div className="text-5xl">Order the latest items with hot deals</div>
                <Link href={`${host}/viewProducts?category=all&sort=asc_name`}><button className="self-end">Shop All</button></Link>
            </div>
            <Image src={`/headerImage.jpg`} className="opacity-75" alt={'Header Image'} width={0} height={0} sizes="100vw" style={{width: "100%", height: "100%", objectFit: 'cover'}}/>
        </div>
    )
}