import Icon from "@mdi/react"
import ProductItem from "./ProductItem"
import { mdiGreaterThan, mdiLessThan } from "@mdi/js"
import { ProductObject } from "../types/ProductObject"

interface Prop {
    products: Array<ProductObject>;
}

export default function BestSellers({products}: Prop) {
    return (
        <div className="flex w-full h-104">
            <div className="flex self-center relative px-4">
                    <Icon className="left-14 absolute" path={mdiLessThan} size={1} />
            </div>
            <div className="flex w-full flex-col">
                <div className="flex py-2 justify-center items-center relative">
                    <div className="text-3xl font-medium pb-2">Best Sellers</div>
                    <button className=" absolute right-4">See More</button>
                </div>
                <div className="flex self-center gap-8">
                    <ProductItem product={products[0]}/>
                    <ProductItem product={products[0]}/>
                    <ProductItem product={products[0]}/>
                    <ProductItem product={products[0]}/>   
                </div>
            </div>
            <div className="flex self-center px-4 relative">
                <Icon className="right-14 absolute" path={mdiGreaterThan} size={1}/>
            </div>
        </div>
    )
}