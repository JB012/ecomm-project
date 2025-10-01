"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ByCategory() {
    const [host, setHost] = useState("");

    useEffect(() => {
        if (host === "") {
            setHost(window.location.origin);
        }
    },[host]);
    
    return (
        <div id="category-container" className="flex flex-col w-full pb-8">
            <div className="flex justify-center items-center relative py-8">
                <div className="text-3xl font-medium">Shop By Category</div>
                <button className="absolute right-12">See More</button>
            </div>
            <div className="flex w-full justify-center">
                <div className="grid gap-8 grid-flow-col grid-rows-2 pb-10">
                        <Link href={`${host}/viewProducts?category=beauty&sort=asc_name`} className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/beauty.jpeg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Beauty</div>
                        </Link>
                        <Link href={`${host}/viewProducts?category=furniture&sort=asc_name`} className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/furniture.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Furniture</div>
                        </Link>
                        <Link href={`${host}/viewProducts?category=home-decoration&sort=asc_name`} className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/decorations.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Home Decorations</div>
                        </Link>
                        <Link href={`${host}/viewProducts?category=kitchen-accessories&sort=asc_name`} className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/kitchen_accessories.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Kitchen Accessories</div>
                        </Link>
                        <Link href={`${host}/viewProducts?category=mens-shirts&sort=asc_name`} className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/mens.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Men&apos;s</div>
                        </Link>
                        <Link href={`${host}/viewProducts?category=groceries&sort=asc_name`} className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/groceries.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Groceries</div>
                        </Link>
                        <Link href={`${host}/viewProducts?category=womens-shoes&sort=asc_name`} className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/womens.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Women&apos;s</div>
                        </Link>
                        <Link href={`${host}/viewProducts?category=fragrances&sort=asc_name`} className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/fragrances.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="container-text">Fragrances</div>
                        </Link>
                </div>
            </div>
        </div>
    )
}