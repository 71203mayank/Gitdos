import { useEffect, useState } from "react";
import type { Gitdo } from "../../types";
import axios from "axios";
import {UserCircle} from "lucide-react"

const GitdoCard = ({ gitdo }: { gitdo: Gitdo }) => {
    const [avatarUrl, setAvatarUrl] = useState("");
    useEffect(() => {
        // fetch github info from github api and update the user progile pic
        axios.get(`https://api.github.com/users/${gitdo.recipient_username}`)
            .then(response => {
                // handle success
                console.log(response.data);
                setAvatarUrl(response.data.avatar_url);
            })
            .catch(error => {
                console.error("Error fetching GitHub user data:", error);
            });

    })
    return (
        // square card
        <div className="w-[18rem] h-[18rem] bg-secondary-muted rounded-md p-4 flex flex-col gap-2">
            {/* header */}
            <div className="flex gap-2 w-full">
                {/* image url can direclty be fetched using the recipient_username: */}
                {avatarUrl ? <img src={avatarUrl} alt="User Avatar" className="h-12 w-12 object-cover rounded-full" /> : <UserCircle className="h-12 w-12 text-muted-border" />}
            </div>

            {/* meta data */}
        </div>
    );
};

export default GitdoCard;