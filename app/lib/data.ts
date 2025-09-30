import { ConnectionOptions } from "mysql2/promise";
import { ProductObject } from "../types/ProductObject";
import awsCaBundle from 'aws-ssl-profiles';

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

export const access: ConnectionOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ssl: awsCaBundle
};