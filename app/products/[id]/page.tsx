"use client"
import Image from "next/image"
import Icon from "@mdi/react"
import { mdiPlus, mdiStar } from "@mdi/js"
import { use, useEffect, useState } from "react"
import Review from "../../components/Review"
import Link from "next/link"
import { ProductObject } from "../../types/ProductObject"
import { useSearchParams } from "next/navigation"


let reviewKey = 0;

export default function Products({params}: {params: Promise<{ id: string }>}) {
    const {id} = use(params);
    const [viewProductInfo, setViewProductInfo] = useState(true);
    const [viewShippingInfo, setViewShippingInfo] = useState(true);
    const [product, setProduct] = useState({} as ProductObject)

    useEffect(() => {
        const data = localStorage.getItem('products');
        if (typeof data === 'string') {
            const allProducts = JSON.parse(data) as Array<ProductObject>;
            const findProduct = allProducts.find((product) => product.id.toString() === id);  

            if (findProduct !== undefined) {
                setProduct(findProduct);
            }
        }
    }, [id]);

    return(
        <>
        {
            Object.keys(product).length !== 0 &&
            <div className="flex flex-col w-full h-full px-6">
                <div className="flex gap-1.5 py-4">
                    <Link href="/">Home</Link>
                    <div>/</div>
                    <Link href="/">{product.title}</Link>
                </div>
                <div className="flex w-full gap-12 justify-center pb-14">
                    <div className="flex flex-1 h-[365px] w-[480px] flex-col">
                        <Image src={product.images[0]} alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />

                        <div className="flex h-[50px] w-[50px]">
                            {product.images.slice(1).map((url) => <Image key={url} src={url} alt={'Image of ' + product.title} height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />)}
                        </div>
                    </div>
                    <div className="flex flex-2 flex-col gap-2">
                        <div className="text-4xl">
                            {product.title}
                        </div>
                        <div className="flex gap-5">
                            <div className="line-through">${product.price}</div>
                            <div className="text-green-500">${(product.price - (product.price * (product.discountPercentage/100))).toFixed(2)}</div>
                            <div className="text-red-500">{Math.floor(product.discountPercentage)}% off</div>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex">
                                {[...Array(5)].map((elem, index) => {if (index <= Math.floor(product.rating)) {return <Icon key={index} path={mdiStar} size={1} color={'yellow'} />} else { return (<Icon key={index}  path={mdiStar} size={1} />)}})}
                            </div>
                            <div>{product.reviews.length} ratings</div>
                        </div>
                        <div className="flex gap-8.5 pb-4">
                            <div>In Stock - {product.stock} Left</div>
                            <div className="flex justify-center gap-4">
                                <select>
                                    {[...Array(product.minimumOrderQuantity)].map((elem,index) =>{if (index !== 0 && index <= product.stock) { return (<option key={index}>{index}</option>)} })}
                                </select>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                        <div className="py-4">
                            {product.description}
                        </div>
                        <hr></hr>
                        <div className="flex flex-col">
                            <div onClick={() => setViewProductInfo(!viewProductInfo)} className="flex cursor-pointer justify-between">
                                <div>Product Information</div>
                                <div onClick={() => setViewProductInfo(!viewProductInfo)}><Icon path={mdiPlus} size={1}/></div>
                            </div>
                            {
                                viewProductInfo ?
                                <div className="flex flex-col py-2">
                                    <div>Brand: {product.brand}</div>
                                    <div>Dimension: {product.dimensions.width}W {product.dimensions.height}H {product.dimensions.depth}D</div>
                                    <div>Weight: {product.weight}</div>
                                    <div>Category: {product.category}</div>
                                </div>
                                : <div></div>
                            }
                        </div>
                        <hr></hr>
                        <div className="flex flex-col">
                            <div onClick={() => setViewShippingInfo(!viewShippingInfo)} className="flex cursor-pointer justify-between">
                                <div>Shipping & Returns</div>
                                <div onClick={() => setViewShippingInfo(!viewShippingInfo)}><Icon path={mdiPlus} size={1}/></div>
                            </div>
                            {
                                viewShippingInfo ?
                                <div className="flex flex-col py-2">
                                    <div>Shipping: {product.shippingInformation}</div>
                                    <div>Warranty: {product.warrantyInformation}</div>
                                    <div>Return Policy: {product.returnPolicy}</div>
                                </div>
                                : <div></div>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex justify-between py-2.5 items-center">
                    <div className="text-2xl">Reviews</div>
                    <div className="flex">
                        <div>Sort By:</div>
                        <select>
                            <option>Recent</option>
                            <option>Stars</option>
                        </select>
                    </div>
                </div>
                <div>
                    {product.reviews.map((review) => <Review key={reviewKey++} review={review}/>)}
                </div>
            </div>
        }
        </>
    )
}
