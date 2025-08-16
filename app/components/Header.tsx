import Icon from '@mdi/react';
import { mdiMagnify, mdiAccount, mdiCartOutline } from '@mdi/js';
export default function Header() {
    return(
        <header className="flex w-full justify-between px-4">
            <div className="flex flex-1">
                <div className='pr-4'>
                    BuyMyStuff
                </div>
                <div className="flex w-full justify-between">
                    <Icon path={mdiMagnify} color={"black"} size={1} />
                    <input className='flex-1 bg-black' placeholder="Search item here"></input>
                </div>
            </div>
            <div className="flex flex-1 justify-between">
                <ul className='flex pl-4 gap-10'>
                    <li>Shop All</li>
                    <li>Shop By Category</li>
                    <li>Best Sellers</li>
                    <li>Sale</li>
                </ul>
                <div className='flex gap-6'>
                    <Icon path={mdiAccount} color={"black"} size={1} />
                    <Icon path={mdiCartOutline} color={"black"} size={1} />
                </div>
            </div>
        </header>
    )
}