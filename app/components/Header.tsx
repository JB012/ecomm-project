"use client"
import Icon from '@mdi/react';
import { mdiMagnify, mdiAccount, mdiCartOutline } from '@mdi/js';
import Link from 'next/link';
export default function Header() {
    return(
        <div id="header-container" className="flex w-full h-12 justify-between items-center px-4">
            <div className="flex flex-1">
                <Link className='pr-4 text-2xl font-medium' href='/'>
                    BuyMyStuff
                </Link>
                <div className="flex w-full items-center justify-between bg-white rounded-full">
                    <Icon path={mdiMagnify} color={"black"} size={1} />
                    <input className='flex-1 outline-0' placeholder="Search item here"></input>
                </div>
            </div>
            <div className="flex flex-1 justify-between">
                <ul className='flex pl-20 font-medium gap-10'>
                    <Link href={'/viewProducts'}>Shop All</Link>
                    <li>Shop By Category</li>
                    <li>Best Sellers</li>
                    <li>Sale</li>
                </ul>
                <div className='flex gap-6'>
                    <Icon path={mdiAccount} color={"black"} size={1} />
                    <Icon path={mdiCartOutline} color={"black"} size={1} />
                </div>
            </div>
        </div>
    )
}