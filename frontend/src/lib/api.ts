import axios from 'axios';
import { ApiResponse, AuthResponse, Feed, Post, User, FeedFollow } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const feedService = {
  createFeed: async (feed: Omit<Feed, 'id' | 'isActive'>): Promise<ApiResponse<Feed>> => {
    const response = await api.post('/v1/feeds', feed);
    return response.data;
  },

  getFeeds: async (): Promise<ApiResponse<Feed[]>> => {
    const response = await api.get('/v1/feeds');
    return response.data;
  },

  createFeedFollow: async (feedFollow: Omit<FeedFollow, 'id' | 'createdAt'>): Promise<ApiResponse<FeedFollow>> => {
    const response = await api.post('/v1/feed_follows', feedFollow);
    return response.data;
  },

  getFeedFollows: async (): Promise<ApiResponse<FeedFollow[]>> => {
    const response = await api.get('/v1/feed_follows');
    return response.data;
  },

  deleteFeedFollow: async (feedFollowId: string): Promise<ApiResponse<void>> => {
    const response = await api.delete(`/v1/feed_follows/${feedFollowId}`);
    return response.data;
  },
};

export const postService = {
  getPostsForUser: async (): Promise<ApiResponse<Post[]>> => {
    const response = await api.get('/v1/posts');
    return response.data;
  },
};

export const userService = {
  createUser: async (user: { email: string; password: string }): Promise<ApiResponse<User>> => {
    const response = await api.post('/v1/users', user);
    return response.data;
  },

  login: async (credentials: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> => {
    const response = await api.post('/v1/login', credentials);
    return response.data;
  },

  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    const response = await api.get('/v1/users');
    return response.data;
  },
};

export const authService = {
  setAuth: (token: string, user: User) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  getAuth: (): { token: string | null; user: User | null } => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return {
      token,
      user: user ? JSON.parse(user) : null,
    };
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};

export default api;