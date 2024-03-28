import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware"
import type { NextRequest } from 'next/server'
import { NextResponse } from "next/server";


export default withAuth(
 async function middleware(req: NextRequest) {
    const user = await getToken({req: req});
  
    if (req.nextUrl.pathname.startsWith('/admin') && user?.accessLvl !== "admin") {
       return NextResponse.redirect(new URL("/caselist", req.url));
    } 
     
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.accessLvl === "admin" || token?.accessLvl === "moderator",
    },
  }
)

export const config = { matcher: ["/caselist",'/extended','/admins','/api/', '/'] }

  