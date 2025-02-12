import LoginForm from '@/components/LoginForm';

export default async function LoginPage() {
  return (
    <div className="flex flex-col items-center gap-4 relative">
      <LoginForm />
    </div>
  );
}
