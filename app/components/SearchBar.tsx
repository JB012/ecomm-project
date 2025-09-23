import { useState, useEffect, ChangeEvent, useRef } from "react"
import { ProductObject } from "../types/ProductObject";
import SearchItem from "./SearchItem";
import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";


export default function SearchBar() {
    const [products, setProducts] = useState(Array<ProductObject>)
    const [input, setInput] = useState("");
    const [isFocused, setFocused] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleFocus = () => {
            setFocused(document.activeElement === inputRef.current);
        };

        document.addEventListener("focusin", handleFocus);
        document.addEventListener("focusout", handleFocus);

        handleFocus();

        fetch("/api/products").then(res => res.json()).then(data => {
            setProducts(data["products"]);
        });

        return (() => {
            document.removeEventListener("focusin", handleFocus);
            document.removeEventListener("focusout", handleFocus);
        });
    }, []);

    function retrievingQueryItems(e : ChangeEvent<HTMLElement>) {
        const target = e.target as HTMLTextAreaElement;
        const word = target.value;

        if (isFocused) {
            const filteredProducts = products.filter((product) => product.title.toLowerCase().startsWith(word.toLowerCase()));
            setProducts(filteredProducts);
        }

        
        setInput(word);
    }

    return (
        <div className="flex flex-col relative">
            <div className="flex">
                <Icon path={mdiMagnify} color={"black"} size={1} />
                <input className='flex-1 outline-0 w-2xl bg-white rounded-full' ref={inputRef} value={input} onChange={((e) => retrievingQueryItems(e))} placeholder="Search item here"></input>
            </div>
            <div className="flex flex-col absolute w-[450px] z-20 top-8 left-6">
                {input !== "" && products.slice(0,10).map((product) => <SearchItem key={product.id} setInput={setInput} product={product} />)}
            </div>
        </div>
    )
}