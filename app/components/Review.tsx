import { mdiAccount, mdiStar } from "@mdi/js";
import Icon from "@mdi/react";

export default function Review() {
    return (
        <div className="flex flex-col py-4 gap-2 w-full">
            <div className="flex gap-8">
                <Icon path={mdiAccount} size={1}/>
                <div>Name</div>
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
                    Reviewed on Date
                </div>
            </div>
            <div className="flex">
                Comment
            </div>
        </div>
    )
}