
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { GET_AURTHOR_BY_GITHUB_ID_QUERY } from "./lib/queries"
import { writeClient } from "./lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks:{
    async signIn({user, profile}){
      const existingUser = await client.config({useCdn:false}).fetch(GET_AURTHOR_BY_GITHUB_ID_QUERY, {id:profile?.id});// 60 sec catching is false
      
      if(!existingUser){
        await writeClient.create({
          _type:"aurthor",
          id:profile?.id,
          name:user?.name,
          username:profile?.name?.split("-")[0],
          email:profile?.email,
          image:user?.image,
          bio:profile?.bio  || ''
        });
      }
      return true;// Continue sign in proccess
    },
    async jwt({token, account, profile}){
      if(account && profile){
        const user = await client.config({useCdn:false}).fetch(GET_AURTHOR_BY_GITHUB_ID_QUERY, {id:profile?.id});
        token.id= user?._id;
      }
      return token;
    },
    async session({token, session}){
      Object.assign(session, {id:token.id});
      return session;
    }
  }
})