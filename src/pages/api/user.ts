import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "../../lib/middleware";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ message: "Hello Auth", userId: req.body.reqUID })
}

export default withAuth(handler)