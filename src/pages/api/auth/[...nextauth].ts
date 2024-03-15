import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../prisma";
import { compare } from "bcrypt-ts";
import NextAuth from "next-auth/next";
 
export const authOptions = {

secret: process.env.NEXTAUTH_SECRET,

  session: {
     strategy: 'jwt' as const 
    },
  pages: {
    signIn: '/',
    signOut: '/',
  },
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
        } as any
      }

      return null;
    }
  })
],
 
}

export default NextAuth(authOptions);