import { getCart } from "../../app/lib/data";

const addItemButton = document.querySelector<HTMLElement>(".add-item-button");
const cartNotification = document.querySelector<HTMLElement>(".cart-notification");
const cartNumber = document.querySelector<HTMLElement>(".cart-number");

    
addItemButton?.addEventListener("click", async () => {
    
    alert("HEYY");
    const cart = await getCart();
    if (cart.length !== 0) {
        if (cartNotification !== null) {
            cartNotification.style.display = "display";
            
            cartNumber!.textContent = cart.length();
        }
    }
});