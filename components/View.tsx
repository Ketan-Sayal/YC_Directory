import React from 'react'
import Ping from './Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/lib/queries'
import { writeClient } from '@/lib/write-client'
import { unstable_after as after } from 'next/server'

const View = async({id}:{id:string}) => {
  const {views:totalViews} = await client.withConfig({useCdn:false}).fetch(STARTUP_VIEWS_QUERY,{id:id});// show new data always
  // TODO: Update views
   after(async ()=>{
     await writeClient.patch(id).set({views: totalViews+1}).commit();
   });// after first query is finished and views is set

  return (
    <div className='view-container'>
      <div className="absolute -top-2 -right-2">
        <Ping/>
      </div>
      <p className='view-text'>
        <span className='font-black'>Views: {totalViews}</span>
      </p>
    </div>
  )
}

export default View
