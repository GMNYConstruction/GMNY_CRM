import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma";
import { compare } from "bcrypt-ts";
import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { access } from "fs";
 
 
 
export const authOptions = {
adapter: PrismaAdapter(prisma),
providers: [
  
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: {},
      password: {}, 
    },
    async authorize(credentials, req) {
      const res = await prisma.users.findMany({
        where:{
          email: credentials?.email,
        }
      });
 
      const user = res[0];
       
      const checkPass = await compare(credentials?.password || '', user?.password);

      if (checkPass) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          accessLvl: user.accessLvl
        }  as any
      }

      return null;
    }
  })
],

callbacks: {
  async jwt({token, user, session} : any) {
    // console.log('jtw', {token, user, session})
    if(user) return {
      ...token,
      id: user.id,
      accessLvl: user.accessLvl,
    }

    return token;
  },
  async session({session, token, user}: any) {
   // console.log('session',{session, token, user})
    return {
      ...session,
      user: {
        ...session.user,
        id: token.id,
        accessLvl: token.accessLvl,
      }
    };
  }
},
secret: process.env.NEXTAUTH_SECRET,
  session: {
     strategy: 'jwt' as const 
    },
  pages: {
    signIn: '/',
    signOut: '/',
  },  

 


 
}

export default NextAuth(authOptions);