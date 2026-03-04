import { useState } from 'react';
import { useFeed } from '@/contexts/FeedContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const feedSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Must be a valid URL'),
  description: z.string().optional(),
});

type FeedFormData = z.infer<typeof feedSchema>;

export default function AddFeedModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { createFeed } = useFeed();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedFormData>({
    resolver: zodResolver(feedSchema),
  });

  const onSubmit = async (data: FeedFormData) => {
    await createFeed(data);
    setIsOpen(false);
    reset();
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
      >
        Add Feed
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <h3 className='text-xl font-semibold mb-4'>
              Add New RSS Feed
            </h3>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              <div className='space-y-2'>
                <div>
                  <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
                    Title
                  </label>
                  <input
                    {...register('title')}
                    type='text'
                    id='title'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='Enter feed title'
                  >
                  {errors.title && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor='url' className='block text-sm font-medium text-gray-700'>
                    RSS Feed URL
                  </label>
                  <input
                    {...register('url')}
                    type='url'
                    id='url'
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    placeholder='https://example.com/feed.xml'
                  >
                  {errors.url && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.url.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
                    Description
                  </label>
                  <textarea
                    {...register('description')}
                    id='description'
                    rows={3}
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none'
                    placeholder='Optional description'
a                    maxLength={200}
                  >
                  </textarea>
                </div>
              </div>
              <div className='flex space-x-3'>
                <button
                  type='button'
                  onClick={() => {
                    setIsOpen(false);
                    reset();
                  }}
                  className='flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  className='flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors'
                >
                  Add Feed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}