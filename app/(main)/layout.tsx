import { SideBar } from './components/sideBar';

import { IncomingMessage } from 'http';
import { LayoutHead } from './components/layout-head';
import { AuthCheck } from './components/authCheck';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: // req,
{
  children: React.ReactNode;
  // req: IncomingMessage;
}) {
  return (
    <div className='grid lg:grid-cols-6'>
      <SideBar />
      <div className='col-span-5 border-l'>
        <div className='container mx-auto py-10'>
          <AuthCheck />
          <LayoutHead />
          {children}
        </div>
      </div>
    </div>
  );
}
