// eslint-disable-next-line
"use client"
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/validation';
import {z} from "zod";
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});// to define that object has strings
    const [pitch, setPitch] = useState("");
    const router = useRouter();
    const {toast} = useToast();

;
    const handleFormSubmit = async(prevState: any, formData:FormData)=>{
        try {
            const formValues = {
                title:formData.get('title') as string,
                description: formData.get("description") as string,
                category:formData.get('category') as string,
                pitch,
                link: formData.get("link") as string,
            }
            await formSchema.parseAsync(formValues);
            // console.log(formValues);
            const result = await createPitch(prevState, formData, pitch);
            if(result?.status === "SUCCESS"){
                toast({
                    title:"Success",
                    description:"Your startup pitch has created successully",
                });
                router.push(`/startup/${result._id}`);
            }
            
            return result;
        } catch (error) {
            // console.log(error);
            if(error instanceof z.ZodError){
                const feildErrors = error.flatten().fieldErrors;
                setErrors(feildErrors as unknown as Record<string, string>);
                toast({
                    title:"Error",
                    description:"Please check your inputs and try again",
                    variant:"destructive"
                });
                return {...prevState, error:'Validation failed', status:"ERROR"}
            }
            toast({
                    title:"Error",
                    description:"An unexpected error has occured",
                    variant:"destructive"
            });
            return {...prevState, error:"An unexpected error has occured", status:"ERROR"}
            
        }
    }

    const [state, action, isPending] = useActionState(handleFormSubmit, {error:'', status:"INITIAL"});

    
  return (
    <form action={action} className='startup-form'>
        <div>
            <label htmlFor="title" className='startup-form_label'>Title</label>
            <Input className='startup-form_input' id='title' name='title'  placeholder='Startup Title'/>
            {errors?.title && <p className='startup-form_error'>{errors.title[0]}</p>}
        </div>
        <div>
            <label htmlFor="description" className='startup-form_label'>Description</label>
            <Textarea className='startup-form_textarea' id='description' name='description'  placeholder='Startup Description'/>
            {errors?.description && <p className='startup-form_error'>{errors.description[0]}</p>}
        </div>
        <div>
            <label htmlFor="category" className='startup-form_label'>Category</label>
            <Input className='startup-form_input' id='category' name='category'  placeholder='Startup Category(Tech, Health, Education)'/>
            {errors?.category && <p className='startup-form_error'>{errors.category[0]}</p>}
        </div>
        <div>
            <label htmlFor="link" className='startup-form_label'>Image URL</label>
            <Input className='startup-form_input' id='link' name='link'  placeholder='Startup Image URL'/>
            {errors?.link && <p className='startup-form_error'>{errors.link[0]}</p>}
        </div>
        <div data-color-mode="light">
            <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
            <MDEditor
            value={pitch}
            onChange={(value)=>setPitch(value as string)}
            id='pitch'
            preview='edit'
            height={300}
            style={{borderRadius:20, overflow:"hidden"}}
            textareaProps={{
                placeholder:'Briefly describe your idea and what problem it solves?'
            }}
            previewOptions={
                {
                    disallowedElements: ['style']
                }
            }
            />
            {errors?.pitch && <p className='startup-form_error'>{errors.pitch[0]}</p>}
        </div>
        <Button type='submit' disabled={isPending} className='startup-form_btn text-white'>
            {isPending?"Submitting...":"Submit your startup"}
            <Send className='size-6 ml-2'/>
        </Button>
    </form>
  )
}

export default StartupForm;
