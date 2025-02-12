'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks';
import { PathEnum } from '@/enums';
import { loginSchema } from '@/lib/validationSchema';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { user, login, logout } = useAuth();

  const [error, setError] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        setError('Invalid email or password');
        return;
      }

      const user = await res.json();
      login(user);
      router.push(PathEnum.Dashboard);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return user ? (
    <div className="flex flex-col gap-4">
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <button
        className="bg-white text-black rounded-xl w-full hover:bg-red-300 transition-colors duration-300"
        type="button"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  ) : (
    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-2 relative">
      <h1>Login</h1>
      <input className="text-black p-1" type="email" placeholder="Email" {...register('email')} />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}{' '}
      <input
        className="text-black p-1"
        type="password"
        placeholder="Password"
        {...register('password')}
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}{' '}
      <button
        className="bg-white text-black rounded-xl hover:bg-green-300 transition-colors duration-300"
        type="submit"
      >
        Log In
      </button>
      {error && <p className="text-red-500 absolute top-full mt-8">{error}</p>}
    </form>
  );
}
