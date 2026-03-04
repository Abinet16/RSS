import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Feed, Post } from '@/types';
import { feedService, postService } from '@/lib/api';

interface FeedContextType {
  feeds: Feed[];
  feedFollows: Feed[];
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  createFeed: (feedData: Omit<Feed, 'id' | 'isActive'>) => Promise<void>;
  followFeed: (feedId: string) => Promise<void>;
  unfollowFeed: (feedFollowId: string) => Promise<void>;
  markPostAsRead: (postId: string) => Promise<void>;
  markPostAsFavorite: (postId: string) => Promise<void>;
}

interface FeedProviderProps {
  children: ReactNode;
}

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider: React.FC<FeedProviderProps> = ({ children }) => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [feedFollows, setFeedFollows] = useState<Feed[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadFeedData();
  }, []);

  const loadFeedData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [feedsResponse, feedFollowsResponse, postsResponse] = await Promise.all([
        feedService.getFeeds(),
        feedService.getFeedFollows(),
        postService.getPostsForUser(),
      ]);

      if (feedsResponse.success) {
        setFeeds(feedsResponse.data || []);
      }
      if (feedFollowsResponse.success) {
        setFeedFollows(feedFollowsResponse.data || []);
      }
      if (postsResponse.success) {
        setPosts(postsResponse.data || []);
      }
    } catch (err) {
      setError('Failed to load feed data');
      console.error('Error loading feed data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const createFeed = async (feedData: Omit<Feed, 'id' | 'isActive'>) => {
    try {
      const response = await feedService.createFeed(feedData);
      if (response.success && response.data) {
        setFeeds((prev) => [...prev, response.data]);
      }
    } catch (error) {
      setError('Failed to create feed');
      console.error('Error creating feed:', error);
    }
  };

  const followFeed = async (feedId: string) => {
    try {
      const response = await feedService.createFeedFollow({ feedId, userId: 'current-user-id' });
      if (response.success && response.data) {
        const followedFeed = feeds.find((feed) => feed.id === feedId);
        if (followedFeed) {
          setFeedFollows((prev) => [...prev, followedFeed]);
        }
      }
    } catch (error) {
      setError('Failed to follow feed');
      console.error('Error following feed:', error);
    }
  };

  const unfollowFeed = async (feedFollowId: string) => {
    try {
      const response = await feedService.deleteFeedFollow(feedFollowId);
      if (response.success) {
        setFeedFollows((prev) => prev.filter((feed) => feed.id !== feedFollowId));
      }
    } catch (error) {
      setError('Failed to unfollow feed');
      console.error('Error unfollowing feed:', error);
    }
  };

  const markPostAsRead = async (postId: string) => {
    try {
      // Implement marking post as read
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, isRead: true } : post
        )
      );
    } catch (error) {
      setError('Failed to mark post as read');
      console.error('Error marking post as read:', error);
    }
  };

  const markPostAsFavorite = async (postId: string) => {
    try {
      // Implement marking post as favorite
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, isFavorite: !post.isFavorite } : post
        )
      );
    } catch (error) {
      setError('Failed to mark post as favorite');
      console.error('Error marking post as favorite:', error);
    }
  };

  return (
    <FeedContext.Provider
      value={{
        feeds,
        feedFollows,
        posts,
        isLoading,
        error,
        createFeed,
        followFeed,
        unfollowFeed,
        markPostAsRead,
        markPostAsFavorite,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

export const useFeed = () => {
  const context = useContext(FeedContext);
  if (context === undefined) {
    throw new Error('useFeed must be used within a FeedProvider');
  }
  return context;
};