import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/login');
      } else {
        setUserEmail(session.user.email);
        setLoading(false);
      }
    });
  }, [router]);

  if (loading) return null;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userEmail}</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Today's Schedule</h2>
        <div className="bg-gray-100 p-4 rounded">/* Calendar events will render here */</div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Top 3 Tasks</h2>
        <div className="bg-gray-100 p-4 rounded">/* Tasks will render here */</div>
      </section>

      <section>
        <input type="text" placeholder="Quick add..." className="border p-2 w-full" />
      </section>
    </main>
  );
}