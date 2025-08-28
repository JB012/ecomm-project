import CartItem from "../components/CartItem"

export default function Cart() {
    return (
        <div className="flex flex-col px-4 py-4 w-full h-full">
            <div className="text-3xl">Cart</div>
            <div className="flex py-3 justify-end">
                <button>Checkout</button>
            </div>
            <div className="flex justify-between">
                <div>Items</div>
                <div>Price</div>
            </div>
            <div className="flex flex-col">
               < CartItem /> 
               < CartItem /> 
            </div>
            <div className="items-end">
                <hr></hr>
                <div className="flex pt-4 justify-end">
                    Total (I Item): $0.00
                </div>
            </div>
        </div>
    )
}