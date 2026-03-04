import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '@/lib/middleware';
import { userService } from '@/lib/api';

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await authMiddleware(req, res);

    // Clear authentication
    res.setHeader('Set-Cookie', [
      'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
      'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly',
    ]);

    res.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}