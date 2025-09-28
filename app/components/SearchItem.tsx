import Link from "next/link";
import { ProductObject } from "../types/ProductObject";
import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";

export default function SearchItem({product, setInput} : {product : ProductObject, setInput : (value: SetStateAction<string>) => void}) {
    const [host, setHost] = useState("");

    useEffect(() => {
        setHost(window.location.origin);
    }, []);
    
    return (
        <li>
            <Link onClick={() => setInput("")} href={`${host}/products/${product.id}`} className="flex gap-4 bg-white items-center">
                    <Image src={product.images[0]} alt="Product Image" width={50} height={80} />
                    <div>{product.title}</div>
            </Link>
        </li>
    )
}