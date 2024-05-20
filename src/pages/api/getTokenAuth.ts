// This is an example of how to read a JSON Web Token from an API route
import { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"

export const getTokenAuth = async (req: NextApiRequest) => {
  const token = await getToken({ req })
  if (token) return token;
  
  return false;
}