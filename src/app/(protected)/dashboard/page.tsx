import UserData from '@/components/UserData';

export default async function DashboardPage() {
  return (
    <section className="flex flex-col items-center gap-4">
      <UserData />
    </section>
  );
}
