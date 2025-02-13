'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks';
import { PathEnum } from '@/enums';
import { loginSchema } from '@/lib/validationSchema';
import { User } from '@/providers/UserProvider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
          <InputField label="Email" type="email" {...register('email')} />
          <InputField label="Password" type="password" {...register('password')} />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
      )}
    </div>
  );
}

function LoggedInView({ user, logout }: { user: User; logout: () => void }) {
  return user ? (
    <div className="flex flex-col gap-4">
      <p>Welcome, {user.name}!</p>
      <Button variant="destructive" className="w-full" onClick={logout}>
        Log Out
      </Button>
    </div>
  ) : null;
}

function InputField({ label, type, ...props }: { label: string; type: string }) {
  return <Input type={type} placeholder={label} {...props} />;
}
