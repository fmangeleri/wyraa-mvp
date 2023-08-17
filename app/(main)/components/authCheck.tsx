'use client';

import { auth } from '@/app/db/firebase';
import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

export function AuthCheck() {
  const [user, loading] = useAuthState(auth);

  if (!loading && !user) {
    redirect('/login');
  }

  return <></>;
}
