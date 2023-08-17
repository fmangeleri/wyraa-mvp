import { UserNav } from '@/app/components/userNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='col-span-5 border-l'>
        {/* <div className='h-full px-4 py-6 lg:px-8'> */}
        <div className='container mx-auto py-10'>
          <div className='flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>Dashboard</h2>
              <p className='text-muted-foreground'>Acceda al resumen gastos</p>
            </div>
            <div className='flex items-center space-x-2'>
              <UserNav />
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
