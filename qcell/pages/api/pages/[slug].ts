import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`);
      res.status(200).json(response.data);
    } catch (error) {
      res.status(404).json({ message: 'Page not found' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
