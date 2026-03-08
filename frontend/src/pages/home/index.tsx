import {useState, useEffect} from 'react';
import type {Gitdo} from "../../types";
import GitdoCard from "../../components/gitdoCard";

//ts-ignore
import {db} from "../../config/firestoreConfig.js"
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
const Home = () => {
    const [gitdos, setGitdos] = useState<Gitdo[]>([]);
    // TODO: replace DUMMY_GITDOS with real data from backend

    useEffect(() => {
        const q = query(collection(db, "kudos"), orderBy("timestamp", "desc"));

        // This is the magic listener
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const kudosData = snapshot.docs.map(doc => ({
            ...doc.data()
            }));
            setGitdos(kudosData as Gitdo[]); // React updates the UI automatically!
        });

        return () => unsubscribe(); // Cleanup on unmount
    },[])

    
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
            <div className="flex-1 min-h-0 w-full overflow-y-auto grid [grid-template-columns:repeat(auto-fit,18rem))] [grid-template-rows:repeat(auto-fit,18rem)] gap-4">
            {gitdos.map((gitdo, index) => (
                <GitdoCard key={index} gitdo={gitdo} />
            ))}
            </div>

        </div>
    );
}

export default Home;