import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Call your backend API to logout
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${req.cookies.token}` // Assuming you store the token in a cookie
        }
      });

      // Clear the token cookie
      res.setHeader('Set-Cookie', 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;');

      res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error logging out' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
