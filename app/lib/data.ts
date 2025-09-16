import { ProductObject } from "../types/ProductObject";

export function getCart(product: ProductObject, stockSelected: string) {
    fetch(`${window.location.origin}/api/cart`).then(res => res.json()).then(data => {
            if (data.cart === null) {
                fetch(`${window.location.origin}/api/cart`, {method: 'POST', body: JSON.stringify({product: product, quantity: Number(stockSelected)})});
            }
        });
}