import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '@/lib/middleware';
import { userService } from '@/lib/api';

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    await authMiddleware(req, res);

    const response = await userService.getCurrentUser();
    
    if (response.success && response.data) {
      res.json(response.data);
    } else {
      res.status(401).json({ 
        success: false, 
        error: response.error || 'Unauthorized' 
      });
    }
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}