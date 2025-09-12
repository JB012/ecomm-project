import Icon from "@mdi/react"
import ProductItem from "./ProductItem"
import { mdiGreaterThan, mdiLessThan } from "@mdi/js"
import { ProductObject } from "../types/ProductObject"
import { useState } from "react";

interface Prop {
    products: Array<ProductObject>;
}

export default function BestSellers({products}: Prop) {
    const [index, setIndex] = useState(0);

    return (
        <div className="flex w-full h-104">
            <div className="flex self-center relative px-4">
                    <div onClick={() => {if (index - 4 >= 0) {setIndex(index-4)}}}><Icon className="left-14 absolute cursor-pointer" path={mdiLessThan} size={1} /></div>
            </div>
            <div className="flex w-full flex-col">
                <div className="flex py-2 justify-center items-center relative">
                    <div className="text-3xl font-medium pb-2">Best Sellers</div>
                    <button className=" absolute right-4">See More</button>
                </div>
                <div className="flex self-center gap-8">
                    {
                        products.sort((a, b) => a.rating - b.rating).slice(index, index + 4)?.map((product) => <ProductItem key={product.id} product={product} />)
                    }
                </div>
            </div>
            <div className="flex self-center px-4 relative">
                <div onClick={() => {if (index + 4 < products.length) {setIndex(index+4)}}}><Icon className="right-14 absolute cursor-pointer" path={mdiGreaterThan} size={1}/></div>
            </div>
        </div>
    )
}