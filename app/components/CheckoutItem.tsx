import { ProductObject } from "../types/ProductObject"
import { getDiscountedPrice } from "../utils"
import Image from "next/image"

export default function CheckoutItem({product, quantity} : {product: ProductObject, quantity: number}) {
    return (
        <div className="flex py-3 w-full">
            <Image src={product.images[0]} alt={`Image of ${product.title}`} width='50' height='50' />
            <div className="flex w-full flex-col">
                <div>{product.title}</div>
                <div className="text-xs">Quantity: {quantity}</div>
            </div>
            <div>
                ${getDiscountedPrice(product).toFixed(2)}
            </div>
        </div>
    )
}