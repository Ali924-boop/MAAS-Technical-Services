// pages/admin/index.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdminHome() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to chats page
    router.push('/admin/chats');
  }, []);

  return <p>Redirecting to admin dashboard...</p>;
}
