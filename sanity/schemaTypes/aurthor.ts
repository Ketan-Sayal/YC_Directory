import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const aurthor = defineType({
    name:"aurthor",
    title:"Author",
    type:'document',
    icon: UserIcon,
    fields:[
        defineField({
            name:"id",
            type:'number'
        }),

        defineField({
            name:"name",
            type:'string'
        }),

        defineField({
            name:"username",
            type:'string'
        }),

        defineField({
            name:"email",
            type:'string'
        }),
        defineField({
            name:"image",
            type:'url'
        }),
        defineField({
            name:"bio",
            type:'text'
        }),
    ],
    preview:{// This for how we see the authors: By their name as their title
        select:{
            title:'name',
        }
    }
});