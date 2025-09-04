import { mdiAccount, mdiStar } from "@mdi/js";
import Icon from "@mdi/react";
import { ReviewObject } from "../types/ReviewObject";


export default function Review({review}: {review: ReviewObject}) {
    return (
        <div className="flex flex-col py-4 gap-2 w-full">
            <div className="flex gap-8">
                <Icon path={mdiAccount} size={1}/>
                <div>{review.reviewerName}</div>
            </div>
            <div className="flex gap-6">
                <div className="flex">
                    <Icon path={mdiStar} size={1} />
                    <Icon path={mdiStar} size={1} />
                    <Icon path={mdiStar} size={1} />
                    <Icon path={mdiStar} size={1} />
                    <Icon path={mdiStar} size={1} />
                </div>
                <div>
                    Reviewed on {review.date}
                </div>
            </div>
            <div className="flex">
                {review.comment}
            </div>
        </div>
    )
}