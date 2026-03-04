import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '@/lib/api';

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { email, password, name } = req.body;
    
    if (!email || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        error: 'Email, password, and name are required' 
      });
    }

    const response = await userService.createUser({ email, password });
    
    if (response.success) {
      res.status(201).json(response.data);
    } else {
      res.status(400).json({ 
        success: false, 
        error: response.error || 'Registration failed' 
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
}