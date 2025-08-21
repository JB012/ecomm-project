import Image from "next/image"

export default function ByCategory() {
    return (
        <div className="flex flex-col w-full h-98">
            <div className="flex justify-center items-center relative py-2">
                <div className="text-3xl">Shop By Category</div>
                <button className="absolute right-12">See More</button>
            </div>
            <div className="flex w-full justify-center">
                <div className="grid gap-8 grid-flow-col grid-rows-2">
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/image1.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="self-center absolute">Beauty</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/image1.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="self-center absolute">Furniture</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/image1.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="self-center absolute">Home Decorations</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/image1.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="self-center absolute">Kitchen Accessories</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/image1.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="self-center absolute">Men's</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/image1.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="self-center absolute">Groceries</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/image1.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="self-center absolute">Women's</div>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <Image className="container-image" src={"/image1.jpg"} alt="Category photo" width={280} height={300}/>
                            <div className="self-center absolute">Fragrances</div>
                        </div>
                </div>
            </div>
        </div>
    )
}