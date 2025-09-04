import { ReviewObject } from "./ReviewObject"

export interface ProductObject {
    id: number,
    title: string, 
    description: string,
    category: string,
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