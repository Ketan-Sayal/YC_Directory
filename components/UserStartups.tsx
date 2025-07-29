import { STARTUPS_BY_AURTHOR_QUERY } from "@/lib/queries";
import { client } from "@/sanity/lib/client"
import StartupCard, { StartupTypeCard } from "./StartupCard";
import { Skeleton } from "./ui/skeleton";

const UserStartups = async({id}:{id:string}) => {
    const startups = await client.fetch(STARTUPS_BY_AURTHOR_QUERY, {id});
    // console.log(startups);
    

    return (
        <>
            {startups.length>0?(startups.map((startup:StartupTypeCard)=>(
                <StartupCard key={startup?._id} post={startup}/>
            ))):(<p className="no-result">No posts yet</p>)}
        </>
  )
}

export default UserStartups;

export const StartupCardSkeleton = ()=>{
    return(
        <>
        {[0, 1, 2, 3, 4, 6].map((i:number)=>(
            <li key={i}>
                <Skeleton key={i} className="startup-card_skeleton"/>
            </li>
        ))}
        </>
    )
}
