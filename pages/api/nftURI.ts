import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { nftURI } = req.query
  if (nftURI) {
    try {
      const result = await axios.get(nftURI as string)
      return res.status(200).send(result.data)
    } catch (e: any) {
      return res.status(422).send({ message: 'Cannot get nftURI: ' + e.message })
    }
  } else {
    return res.status(422).send({ message: 'nftURI param is missing' })
  }
}
