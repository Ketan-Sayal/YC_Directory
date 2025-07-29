import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../sanity/env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation[RRevalidate the query after 60 sec]
  token
})

if(writeClient.config()?.token===undefined || !writeClient.config().token){
    throw new Error("Write token not found.");
}