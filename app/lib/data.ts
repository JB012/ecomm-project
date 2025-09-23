import { ProductObject } from "../types/ProductObject";

export function addCartItem(product: ProductObject, stockSelected: number) {
    fetch(`${window.location.origin}/api/cart`, {method: 'POST', body: 
    JSON.stringify({product: product, quantity: stockSelected})});          
}

export function subtractCartItem(product: ProductObject, stockSelected: number) {
    fetch(`${window.location.origin}/api/cart/remove`, {method: 'POST', body: 
    JSON.stringify({product: product, quantity: stockSelected})}); 
}

export async function getCart() {
    const cart = (await (await fetch(`${window.location.origin}/api/cart`)).json())["cart"];

    return cart ? cart : [];
}