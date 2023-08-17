'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function RegisterButton() {
  return (
    <Button
      className='absolute right-4 top-4 md:right-8 md:top-8'
      variant='outline'
      size='sm'
      asChild
    >
      <Link href='/register'>Register</Link>
    </Button>
  );
}
