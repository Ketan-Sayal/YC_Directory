"use server";
import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeClient } from "./write-client";

export const createPitch = async(state:any, form: FormData, pitch:string)=>{
    const session = await auth();
    if(!session){
        return parseServerActionResponse({
            error:"Not signed in",
            status:"ERROR"
        });
    }
    const {title, description, category, link} = Object.fromEntries(
        Array.from(form).filter(([key])=>key!=="pitch")
    );

    const slug = slugify(title as string, {strict:true, lower:true});
    try {
        const startup = {
            _type:"startup",
            title,
            description,
            category,
            image:link,
            slug:{
                _type:"slug",
                current:slug
            },
            aurthor:{
                _type:"reference",
                _ref: session?.id
            }, 
            pitch
        }
        const result = await writeClient.create(startup);
        return parseServerActionResponse({...result, error:'', status:"SUCCESS"})
    } catch (error) {
        console.log(error);
        return parseServerActionResponse({
            error:JSON.stringify(error),
            status:"ERROR"
        });
    }
}