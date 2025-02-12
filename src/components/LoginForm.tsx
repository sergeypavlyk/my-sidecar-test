'use client';

import { useRouter } from 'next/navigation';
import { FieldError, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks';
import { PathEnum } from '@/enums';
import { loginSchema } from '@/lib/validationSchema';
import { User } from '@/providers/UserProvider';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { user, login, logout } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        setError('email', { message: 'Invalid email or password' });
        return;
      }

      const userData = await res.json();
      login(userData);
      router.push(PathEnum.Dashboard);
    } catch (err) {
      console.error(err);
      setError('email', { message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Login</h1>
      {user ? (
        <LoggedInView user={user} logout={logout} />
      ) : (
        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-3 w-72">
          <InputField label="Email" type="email" error={errors.email} {...register('email')} />
          <InputField
            label="Password"
            type="password"
            error={errors.password}
            {...register('password')}
          />
          <button
            className="bg-white text-black rounded-xl p-2 hover:bg-green-300 transition-colors duration-300 disabled:opacity-50"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      )}
    </div>
  );
}

function LoggedInView({ user, logout }: { user: User; logout: () => void }) {
  return user ? (
    <div className="flex flex-col gap-4">
      <p>Welcome, {user.name}!</p>
      <button
        className="bg-white text-black rounded-xl p-2 w-full hover:bg-red-300 transition-colors duration-300"
        type="button"
        onClick={logout}
      >
        Log Out
      </button>
    </div>
  ) : null;
}

function InputField({
  label,
  type,
  error,
  ...props
}: {
  label: string;
  type: string;
  error?: FieldError;
}) {
  return (
    <div className="flex flex-col">
      <input
        className="p-2 border rounded-md text-black focus:ring-2 focus:ring-green-300"
        type={type}
        placeholder={label}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
