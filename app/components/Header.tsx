"use client"
import Icon from '@mdi/react';
import { mdiMagnify, mdiAccount, mdiCartOutline } from '@mdi/js';
import Link from 'next/link';
import SearchBar from './SearchBar';


export default function Header() {
    return(
        <div id="header-container" className="flex w-full h-12 justify-between items-center px-4">
            <div className="flex flex-1">
                <Link className='pr-4 text-2xl w-35 h-5 font-medium' href='/'>
                    BuyMyStuff
                </Link>
                <SearchBar />
            </div>
            <div className="flex flex-1 justify-between">
                <ul className='flex pl-20 font-medium gap-10'>
                    <Link href={'/viewProducts?category=all&sort=asc_name'}>Shop All</Link>
                    <li>Shop By Category</li>
                    <Link href={'/viewProducts?category=all&sort=best_sellers'}>Best Sellers</Link>
                    <Link href={'/viewProducts?category=all&sort=highest_discount'}>Sale</Link>
                </ul>
                <div className='flex gap-6'>
                    <Icon path={mdiAccount} color={"black"} size={1} />
                    <Link href='/cart' className='relative'>
                        <Icon path={mdiCartOutline} color={"black"} size={1} />
                        <div style={{display: 'none'}} className='cart-notification w-4 h-4 rounded-full bg-red-500 absolute top-3 left-3 flex items-center justify-center'>
                            <div className='cart-number text-sm text-white'></div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}