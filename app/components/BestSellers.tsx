import Icon from "@mdi/react"
import ProductItem from "./ProductItem"
import { mdiGreaterThan, mdiLessThan } from "@mdi/js"

export default function BestSellers() {
    return (
        <div className="flex w-full h-96">
            <div className="flex self-center px-4">
                    <Icon path={mdiLessThan} size={1} />
            </div>
            <div className="flex w-full flex-col overflow-hidden">
                <div className="flex py-2 justify-center relative">
                    <div className="text-3xl">Best Sellers</div>
                    <button className="self-end absolute right-0">See More</button>
                </div>
                <div className="flex self-center gap-8">
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    <ProductItem />
                    
                </div>
            </div>
            <div className="flex self-center px-4">
                <Icon path={mdiGreaterThan} size={1}/>
            </div>
        </div>
    )
}