// if data is static then use Suspense

import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from "@/lib/queries";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

export const experimental_ppr=true;

const md = markdownit();
export default async function Page({params}: {params:Promise<{id:string}>}){
    const id = (await params).id;
    const [post, {select:editorPosts}] = await Promise.all([
        client.fetch(STARTUP_BY_ID_QUERY, {id}),
        client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug:"editors-picks-new"})
    ]);// parallel data fetching

    // console.log(post);
    const parseConent = md.render(post?.pitch || ''); 
    
    
    if(!post) return notFound();

    return(
        <>
            <section className="pink_container min-h-[250px]">
                <p className="tag">{formatDate(post?._createdAt)}</p>
                <h1 className="heading">
                    {post?.title}
                </h1>
                <p className="sub-heading !max-w-5xl">{post?.description}</p>
            </section>
            <section className="section_container">
                <img src={post?.image} alt="thumbnail" className="w-full h-auto rounded-xl" />
                <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                    <div className="flex-between gap-5">
                        <Link href={`/user/${post?.aurthor?._id}`} className="flex gap-2 items-center mb-3">
                            <Image src={post?.aurthor?.image} alt='avatar' width={64} height={64} className="rounded-full drop-shadow-lg"/>
                            <div>
                                <p className="text-20-medium !text-black-300">{post?.aurthor?.name}</p>
                                <p className="text-16-medium !text-black-300">@{post?.aurthor?.name}</p>
                            </div>
                        </Link>
                        <p className="category-tag">{post?.category}</p>
                    </div>
                    <h3 className="text-30-bold ">Pitch Details</h3>
                    {parseConent?(
                        <article dangerouslySetInnerHTML={{__html:parseConent}} className="prose max-w-4xl font-work-sans break-all"/>):(<p>
                            No details Provided
                        </p>)}
                </div>
                <hr className="divider"/>
                {/**TODO: Editor selected startups */}
                {editorPosts?.length>0 && <div className="max-w-4xl mx-auto">
                    <p className="text-30-semibold">Editor pics</p>
                    <ul className="mt-7 card_grid-sm">
                        {editorPosts?.map((post:StartupTypeCard, i:number)=>(
                            <StartupCard key={i} post={post}/>
                        ))}
                    </ul>
                    </div>}
                <Suspense fallback={<Skeleton className="view_skeleton"/>}>
                    <View id={id}/>
                </Suspense>
                
            </section>
        </>
    )
}