import { mdiAccount, mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import { ReviewObject } from "../types/ReviewObject";


export default function Review({review}: {review: ReviewObject}) {
    const date = new Date(review.date);
    const localTimeAmPm = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    });
    return (
        <div className="flex flex-col py-4 gap-2 w-full">
            <div className="flex gap-8">
                <Icon path={mdiAccount} size={1}/>
                <div>{review.reviewerName}</div>
            </div>
            <div className="flex gap-6">
                <div className="flex">
                    {Array(5).fill(0).map((elem, index) => index + 1).map((elem) => {if (elem <= review.rating) {return <Icon key={elem} path={mdiStar} size={1} color={'yellow'} />} else { return (<Icon key={elem}  path={mdiStar} size={1} />)}})}
                </div>
                <div>
                    Reviewed on {date.getMonth()}/{date.getDay()}/{date.getFullYear()} {localTimeAmPm}
                </div>
            </div>
            <div className="flex">
                {review.comment}
            </div>
        </div>
    )
}