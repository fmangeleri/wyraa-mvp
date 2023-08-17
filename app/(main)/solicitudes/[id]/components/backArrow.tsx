'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackArrow() {
  const router = useRouter();

  const closeSolCard = () => {
    router.back();
  };

  return (
    <>
      <ArrowLeft onClick={() => router.back()} />
    </>
  );
}
