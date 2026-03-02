import {useState} from 'react';
import type {Gitdo} from "../../types";
import {DUMMY_GITDOS } from "../../constants";
import GitdoCard from "../../components/gitdoCard";
const Home = () => {
    const [gitdos, setGitdos] = useState<Gitdo[]>(DUMMY_GITDOS);
    // TODO: replace DUMMY_GITDOS with real data from backend

    
    return (
        <div className="flex flex-col w-full h-full min-h-0 p-4 gap-2">
            
            {/* header */}
            <div className="border-b border-muted-border/70 pb-2">
            <span>Recent Gitdoes</span>
            <p>
                Some description about recent gitdoes. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Donec vel sapien eget nunc efficitur
                efficitur.
            </p>
            </div>

            {/* list */}
            <div className="flex-1 min-h-0 w-full overflow-y-auto grid [grid-template-columns:repeat(auto-fit,minmax(18rem,1fr))] gap-4">
            {gitdos.map((gitdo, index) => (
                <GitdoCard key={index} gitdo={gitdo} />
            ))}
            </div>

        </div>
    );
}

export default Home;