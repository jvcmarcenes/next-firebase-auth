import { auth } from "firebase-admin";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { auth as admin } from "./firebase-admin";

export const withAuth = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  // // From the dev.to template
  // const authHeader = req.headers.authorization
  
  // if (!authHeader)
  //   return res.status(401).json({ message: '001 Not authenticated' })

  // const token = authHeader.split(' ')[1]
  // let decodedToken: auth.DecodedIdToken
  // try {
  //   decodedToken = await admin.verifyIdToken(token)

  //   if (!decodedToken || !decodedToken.uid)
  //     return res.status(401).json({ message: '002 Not authenticated' })
    
  //   req.headers.authorization = decodedToken.uid
  //   // req.body.reqUID = decodedToken.uid
  // } catch (err) {
  //   console.log(err.errorInfo)

  //   const errorCode = err.errorInfo.code

  //   if (errorCode === 'auth/internal-error') err.status = 500
  //   else err.status = 401

  //   return res.status(err.status).json({ message: errorCode })
  // }

  // Brute Solution
  const uid = req.headers.authorization

  if (!uid) return res.status(401).json({ message: '003 Not Authenticated' })

  return handler(req, res)
}