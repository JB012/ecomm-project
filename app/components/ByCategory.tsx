import Image from "next/image"

export default function ByCategory() {
    return (
        <div className="flex flex-col w-full h-96">
            <div className="flex text-3xl justify-center">
                Shop By Category
            </div>
            <div className="flex w-full justify-center">
                <div className="grid gap-8 grid-flow-col grid-rows-4">
                    <div>
                        <Image src={"/image1.jpg"} alt="Category photo" width={250} height={300}/>
                        <Image src={"/image1.jpg"} alt="Category photo" width={250} height={300}/>
                        <Image src={"/image1.jpg"} alt="Category photo" width={250} height={300}/>
                        <Image src={"/image1.jpg"} alt="Category photo" width={250} height={300}/>
                        <Image src={"/image1.jpg"} alt="Category photo" width={250} height={300}/>
                    </div>
                </div>
            </div>
        </div>
    )
}