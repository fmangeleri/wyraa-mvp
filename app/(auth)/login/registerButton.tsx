'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export async function RegisterButton() {
  return (
    <Link
      href='/register'
      className={cn(
        buttonVariants({ variant: 'ghost', size: 'sm' }),
        'absolute right-4 top-4 md:right-8 md:top-8'
      )}
    >
      Register
    </Link>
  );
}