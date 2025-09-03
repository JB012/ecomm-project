import Icon from "@mdi/react"
import ProductItem from "./ProductItem"
import { mdiGreaterThan, mdiLessThan } from "@mdi/js"

interface Prop {
    products: Array<ProductObject>;
}
interface ProductObject {
    id: number,
    title: string, 
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    tags: Array<string>,
    sku: string,
    weight: number,
    dimensions: {width: number, height: number, depth: number},
    warrantyInformation: string, 
    shippingInformation: string, 
    availabilityStatus: string, 
    reviews: Array<ReviewObject>
    returnPolicy: string,
    minimumOrderQuantity: number,
    meta: {createdAt: string, updatedAt: string, barcode: string, qrCode: string},
    images: Array<string>,
    thumbnail: string
}

interface ReviewObject {
    rating: number,
    comment: string,
    date: string, 
    reviewerName: string,
    reviewerEmail: string
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
                    <ProductItem thumbnail={products[0].thumbnail} title={products[0].title} price={products[0].price}/>
                    <ProductItem thumbnail={products[0].thumbnail} title={products[0].title} price={products[0].price}/>
                    <ProductItem thumbnail={products[0].thumbnail} title={products[0].title} price={products[0].price}/>
                    <ProductItem thumbnail={products[0].thumbnail} title={products[0].title} price={products[0].price}/>   
                </div>
            </div>
            <div className="flex self-center px-4 relative">
                <Icon className="right-14 absolute" path={mdiGreaterThan} size={1}/>
            </div>
        </div>
    )
}