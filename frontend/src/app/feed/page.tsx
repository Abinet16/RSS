'use client'
import { useEffect, useState } from 'react';
import { useFeed } from '@/contexts/FeedContext';
import PostCard from '@/components/PostCard';

export default function FeedPage() {
  const { posts, isLoading, error, markPostAsRead, markPostAsFavorite } = useFeed();
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    filterPosts();
  }, [posts, searchTerm, filter]);

  const filterPosts = () => {
    let filtered = posts;
    
    if (searchTerm) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === 'unread') {
      filtered = filtered.filter((post) => !post.isRead);
    } else if (filter === 'favorites') {
      filtered = filtered.filter((post) => post.isFavorite);
    }

    setFilteredPosts(filtered);
  };

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2'></div>
          <p className='text-gray-600'>Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-red-600 mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors'
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-3xl font-bold text-gray-800'>
            RSS Reader
          </h1>
          <AddFeedModal />
        </div>

        <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                        <div className='flex items-center justify-between mb-4'>
            <div className='flex-1 mr-4'>
              <input
                type='search'
                placeholder='Search posts...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm'
              />
              <svg className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className='px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm'
            >
              <option value='all'>All Posts</option>
              <option value='unread'>Unread Only</option>
              <option value='favorites'>Favorites</option>
            </select>
          </div>

          {filteredPosts.length === 0 ? (
            <div className='text-center py-8'>
              <p className='text-gray-500 mb-4'>
                No posts to display
              </p>
              {filter === 'unread' && (
                <p className='text-gray-400 text-sm mb-4'>
                  You&apos;`ve read all your posts!
                </p>
              )}
              {filter === 'favorites' && (
                <p className='text-gray-400 text-sm mb-4'>
                  You haven&apos;t favorited any posts yet.
                </p>
              )}
              {filter === 'all' && (
                <p className='text-gray-400 text-sm mb-4'>
                  Subscribe to some RSS feeds to get started!
                </p>
              )}
            </div>
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onMarkAsRead={markPostAsRead}
                onMarkAsFavorite={markPostAsFavorite}
              >
              </PostCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
}