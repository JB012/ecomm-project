import Image from "next/image"
import Link from "next/link"
import { ProductObject } from "../types/ProductObject";

interface Prop {
    product: ProductObject;
}

export default function ProductItem({product}: Prop) {
    const url = "/products/" + product.id;

    return (
        <>
        <Link href={url} className="flex flex-col gap-2 cursor-pointer">
            <div className="h-70 w-50">
                <Image src={product.thumbnail} alt="Product Item" width={0} height={0} sizes="100px" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div>
                {product.title}
            </div>
           <div className="flex gap-6">
                <div className="line-through">${product.price}</div>
                <div className="text-green-500">${(product.price - (product.price * (product.discountPercentage/100))).toFixed(2)}</div>
                <div className="text-red-500">{product.discountPercentage}% off</div>
            </div>
        </Link>
        </>
    )
}