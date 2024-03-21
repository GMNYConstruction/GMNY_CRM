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
          status: true,
        }
      });
 
      const user = res[0];

      if (!user) {
          throw new Error("No user was found");
      }
       
      const checkPass = await compare(credentials?.password || '', user?.password);



      if (checkPass) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          accessLvl: user.accessLvl,
          status: user.status,
        }  as any
      }else {
        throw new Error("Wrong Password!");
      }
 
    }
  })
],

callbacks: {
  async jwt({token, user, session} : any) {
    if(user) return {
      ...token,
      id: user.id,
      accessLvl: user.accessLvl,
    }

    return token;
  },
  async session({session, token, user}: any) { 
    return {
      ...session,
      user: {
        ...session.user,
        id: token.id,
        accessLvl: token.accessLvl,
        status: token.status,
      }
    };
  },
  async authorized({ req, token } : any) {
     if(token) return true;
   }
},
secret: process.env.NEXTAUTH_SECRET,
  session: {
     strategy: 'jwt' as const,
     maxAge: 5 * 60 * 60,
    },
  pages: {
    signIn: '/login',
    signOut: '/login',
  },  
 
}

export default NextAuth(authOptions);