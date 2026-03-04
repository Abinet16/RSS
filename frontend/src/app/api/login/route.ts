import { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from '@/lib/middleware';
import { userService } from '@/lib/api';

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email and password are required' 
      });
    }

    const response = await userService.login({ email, password });
    
    if (response.success && response.data) {
      res.json(response.data);
    } else {
      res.status(401).json({ 
        success: false, 
        error: response.error || 'Invalid credentials' 
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}