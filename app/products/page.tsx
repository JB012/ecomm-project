"use client"
import Image from "next/image"
import Icon from "@mdi/react"
import { mdiPlus, mdiStar } from "@mdi/js"
import { useState } from "react"
import Review from "../components/Review"
import Link from "next/link"

export default function Products() {
    const [viewProductInfo, setViewProductInfo] = useState(true);

    return(
        <div className="flex flex-col w-full h-full px-6">
            <div className="flex gap-1.5 py-4">
                <Link href="/">Home</Link>
                <div>/</div>
                <Link href="/">Item</Link>
            </div>
            <div className="flex w-full gap-12 justify-center pb-14">
                <div className="flex flex-1 h-[365px] w-[480px] flex-col">
                    <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />

                    <div className="flex h-[50px] w-[50px]">
                        <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />
                        <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />
                        <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />
                        <Image src="/image1.jpg" alt="Product Image" height={0} width={0} sizes="100vw" style={{height: '100%', width: '100%', objectFit: 'cover'}} />
                    </div>
                </div>
                <div className="flex flex-2 flex-col gap-2">
                    <div className="text-4xl">
                        Title
                    </div>
                    <div className="flex gap-5">
                        <div className="line-through">$1.00</div>
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
                        <div>1000 ratings</div>
                    </div>
                    <div className="flex gap-8.5 pb-4">
                        <div>In Stock - 5 Left</div>
                        <div className="flex justify-center gap-4">
                            <select>
                                <option>1</option>
                                <option>2</option>
                            </select>
                            <button>Add to Cart</button>
                        </div>
                    </div>
                    <div className="py-4">
                        Description
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
                                <div>Brand: Brand</div>
                                <div>Dimension: Dimension</div>
                                <div>Weight: Weight</div>
                                <div>Category: Category</div>
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
                <Review />
            </div>
        </div>
    )
}