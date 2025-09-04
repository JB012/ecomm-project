"use client"
import Image from "next/image"
import Icon from "@mdi/react"
import { mdiPlus, mdiStar } from "@mdi/js"
import { use, useEffect, useState } from "react"
import Review from "../../components/Review"
import Link from "next/link"
import { ProductObject } from "../../types/ProductObject"
import { useSearchParams } from "next/navigation"


export default function Products({params}: {params: Promise<{ id: string }>}) {
    const {id} = use(params);
    const [viewProductInfo, setViewProductInfo] = useState(true);
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
                    <Link href="/">Item</Link>
                </div>
                <div className="flex w-full gap-12 justify-center pb-14">
                    <div className="flex flex-1 h-[365px] w-[480px] flex-col">
                        <Image src={product.images[0]} alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />

                        <div className="flex h-[50px] w-[50px]">
                            <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />
                            <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />
                            <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />
                            <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />
                        </div>
                    </div>
                    <div className="flex flex-2 flex-col gap-2">
                        <div className="text-4xl">
                            {product.title}
                        </div>
                        <div className="flex gap-5">
                            <div className="line-through">{product.price}</div>
                            <div>$0.00</div>
                            <div>10% off</div>
                        </div>
                        <div className="flex gap-5">
                            <div className="flex">
                                <Icon path={mdiStar} size={1} />
                                <Icon path={mdiStar} size={1} />
                                <Icon path={mdiStar} size={1} />
                                <Icon path={mdiStar} size={1} />
                            </div>
                            <div>{product.reviews.length} ratings</div>
                        </div>
                        <div className="flex gap-8.5 pb-4">
                            <div>In Stock - {product.stock} Left</div>
                            <div className="flex justify-center gap-4">
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                        <div className="py-4">
                            {product.description}
                        </div>
                        <hr></hr>
                        <div className="flex flex-col">
                            <div className="flex justify-between">
                                <div>Product Information</div>
                                <div onClick={() => setViewProductInfo(!viewProductInfo)}><Icon path={mdiPlus} size={1}/></div>
                            </div>
                            {
                                viewProductInfo ?
                                <div className="flex flex-col py-2">
                                    <div>Dimension: Dimension</div>
                                    <div>Weight: {product.weight}</div>
                                    <div>Category: {product.category}</div>
                                </div>
                                : <div></div>
                            }
                        </div>
                        <hr></hr>
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
                    {product.reviews.map((review) => <Review key={review.date} review={review}/>)}
                </div>
            </div>
        }
        </>
    )
}
