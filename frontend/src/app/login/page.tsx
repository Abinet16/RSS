'use client';
import {  useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useFeed } from '@/contexts/FeedContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { isLoading: authLoading } = useAuth();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setFormError('');
    const success = await login(data.email, data.password);
    if (success) {
      router.push('/');
    } else {
      setFormError('Invalid email or password');
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='bg-white rounded-lg shadow-xl p-8 w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6 text-gray-800'>
          RSS Reader
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='text-sm text-center mb-4'>
            Sign in to your account
          </div>
          <div className='space-y-2'>
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                {...register('email')}
                type='email'
                id='email'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder='Enter your email'
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                Password
              </label>
              <input
                {...register('password')}
                type='password'
                id='password'
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder='Enter your password'
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          {formError && (
            <p className='text-sm text-red-600 mb-3'>
              {formError}
            </p>
          )}
          <button
            type='submit'
            disabled={authLoading}
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
          >
            {authLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className='mt-6 text-center text-sm'>
          <p className='text-gray-500'>
            Don&apos;t have an account? 
            <button
              type='button'
              onClick={() => router.push('/register')}
              className='font-medium text-indigo-600 hover:text-indigo-500'
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}