'use client';

import { useSelectedLayoutSegments } from 'next/navigation';
import { PageTitle } from './page-title';
import { UserNav } from './userNav';

export function LayoutHead() {
  const segment = useSelectedLayoutSegments();

  if (segment.length > 1) {
    return <></>;
  }

  return (
    <div className='flex justify-between items-center'>
      <PageTitle />
      <div className='flex items-center space-x-2'>
        {/* <UserProvider> */}
        <UserNav />
        {/* </UserProvider> */}
      </div>
    </div>
  );
}
