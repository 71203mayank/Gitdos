import { useState } from "react";
import type { Gitdo } from "../../types";
// import axios from "axios";
import {UserCircle} from "lucide-react"


const DateFormatOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
    // Optional: set a specific locale, e.g., 'en-GB' (British English uses day-month-year order and 24-hour time by default)
    // If no locale is specified, the user's browser default locale will be used, which might vary in format
    // You can also specify the time zone if needed
} as const;

const GitdoCard = ({ gitdo }: { gitdo: Gitdo }) => {
    const [avatarUrl, setAvatarUrl] = useState("");

    // FOR NOW COMMENT THIS OUT TO AVOID HITTING GITHUB API TOO MUCH
    // useEffect(() => {
    //     // fetch github info from github api and update the user progile pic
    //     axios.get(`https://api.github.com/users/${gitdo.recipient_username}`)
    //         .then(response => {
    //             // handle success
    //             console.log(response.data);
    //             setAvatarUrl(response.data.avatar_url);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching GitHub user data:", error);
    //         });

    // })
    return (
        // square card
        <div className="w-[18rem] h-[18rem] bg-secondary-muted rounded-md p-2 flex flex-col gap-2 justify-between border border-muted-border/50 shadow-md shadow-muted-border/50">
            {/* header */}
            <div className="flex gap-3 w-full p-2">
                {/* image url can direclty be fetched using the recipient_username: */}
                {avatarUrl ? <img src={avatarUrl} alt="User Avatar" className="h-12 w-12 object-cover rounded-full" /> : <UserCircle className="h-12 w-12 text-muted-border" />}
                <div className="flex flex-col gap-1">
                    <span className="text-base font-semibold text-white">{gitdo.recipient_username}</span>
                    <div className="text-sm text-white flex gap-2">
                        <span className="hover:underline hover:cursor-pointer">Gitod Profile</span>
                        <span className="hover:underline hover:cursor-pointer">Github</span>
                    </div>
                </div>
            </div>

            {/* meta data */}
            <div className="text-sm flex flex-col gap-2 bg-main p-4 rounded-md">
                <span className="text-neutral-100 text-base font-bold">Contribution details</span>
                <div className="flex flex-col gap-1">
                    <div className="flex flex w-full gap-2">
                        <span className="text-neutral-200 text-sm font-semibold">
                            Repo:
                        </span>
                        <a href={`https://github.com/${gitdo.repo_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            {gitdo.repo_path}
                        </a>
                    </div>
                    <div className="flex w-full gap-2">
                        <span className="text-sm text-white">{gitdo.pr_title}</span>
                    </div>
                    <div className="flex w-full justify-between items-center">
                        {/* DD Month YYYY, time format (date + time) */}
                        <span className="text-neutral-200">{new Date(gitdo.timestamp).toLocaleString("en-GB", DateFormatOptions)}</span>

                        <a href={gitdo.pr_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View PR</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitdoCard;