import { ProductObject } from "./types/ProductObject";

export function getDiscountedPrice(product : ProductObject) : number {
    return (product.price - (product.price * (product.discountPercentage/100)));
}