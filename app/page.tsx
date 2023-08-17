'use client';

import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './db/firebase';

export default function Home() {
  const [user, loading] = useAuthState(auth);

  if (!loading && user) {
    redirect('/dashboard');
  } else if (!loading && !user) {
    redirect('/login');
  }
}
