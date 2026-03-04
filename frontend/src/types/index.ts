export interface Feed {
  id: string;
  title: string;
  url: string;
  description?: string;
  homePageURL?: string;
  lastUpdated?: Date;
  isActive: boolean;
}

export interface Post {
  id: string;
  feedId: string;
  title: string;
  link: string;
  description: string;
  content: string;
  author?: string;
  publishedAt: Date;
  updatedAt?: Date;
  isRead: boolean;
  isFavorite: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedFollow {
  id: string;
  userId: string;
  feedId: string;
  createdAt: Date;
  isActive: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}