import ProductItem from "./ProductItem"

export default function BestSellers() {
    return (
        <div className="flex flex-col">
            <div className="flex justify-center">
                Best Sellers
            </div>
            <ProductItem />
        </div>
    )
}