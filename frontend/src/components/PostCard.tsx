import { Post } from '@/types'';

interface PostCardProps {
  post: Post;
  onMarkAsRead: (postId: string) =>> void;
  onMarkAsFavorite: (postId: string) =>> void;
}

export default function PostCard({ post, onMarkAsRead, onMarkAsFavorite }: PostCardProps) {
  const handleReadClick = () => onMarkAsRead(post.id);
  const handleFavoriteClick = () => onMarkAsFavorite(post.id);

  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow'>
      <h3 className='text-lg font-semibold mb-2 text-gray-800>
        <a
          href={post.link}
          target='_blank'
          rel='noopener noreferrer'
          className='hover:text-indigo-600 transition-colors'
        >
          {post.title}
        </a>
      </h3>
      <div className='flex items-center justify-between text-sm text-gray-500 mb-3'>
        <span>
          {post.author || 'Unknown Author'} | 
          {new Date(post.publishedAt).toLocaleDateString()}
        </span>
        <div className='flex items-center space-x-2'>
          <button
            onClick={handleFavoriteClick}
            className='p-1 text-gray-400 hover:text-yellow-500 transition-colors'
          >
            {post.isFavorite ? (
              <span role='img' aria-label='star'>⭐</span>
            ) : (
              <span role='img' aria-label='star'>☆</span>
            )}
          </button>
          <button
            onClick={handleReadClick}
            className='p-1 text-gray-400 hover:text-green-500 transition-colors'
          >
            {post.isRead ? (
              <span role='img' aria-label='read'>📖</span>
            ) : (
              <span role='img' aria-label='unread'>📰</span>
            )}
          </button>
        </div>
      </div>
      <div
        className='prose prose-gray max-w-none mb-3'
        dangerouslySetInnerHTML={{ __html: post.description }}
      >
      </div>
      <div className='text-right text-sm'>
        <a
          href={post.link}
          target='_blank'
          rel='noopener noreferrer'
          className='text-indigo-600 hover:underline'
        >
          Read more <span role='img' aria-label='arrow'>></span>
        </a>
      </div>
    </div>
  );
}