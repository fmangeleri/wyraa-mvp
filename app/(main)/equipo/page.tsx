import { columns } from './data/columns';
import { Usuario } from './data/types';
import { DataTable } from './data/data-table';
import { UserNav } from '../../components/userNav';
import { SideBar } from '../../components/sideBar';
import { db, auth } from '@/app/db/firebase';

import { getDocs, collection } from 'firebase/firestore';
import UserProvider from '@/app/(main)/contexts/userProvider';

async function getData(): Promise<any> {
  // Fetch data from your API here.
  const ref = collection(db, 'usuarios');

  try {
    const users = await getDocs(ref);
    const usersFiltered = users.docs.map((doc) => {
      const { fecha, ...rest } = doc.data();
      const docAll = {
        id: doc.id,
        // fecha: fecha.toDate(),
        // ...rest,
        ...doc.data(),
      } as Usuario;
      return docAll;
    });
    // console.log(solFiltered);
    return usersFiltered;
  } catch (err) {
    console.error(err);
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <div className='col-span-4 lg:col-span-5 lg:border-l'>
        {/* <div className='h-full px-4 py-6 lg:px-8'> */}
        <div className='container mx-auto py-10'>
          <div className='flex items-center justify-between space-y-2'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Welcome back!
              </h2>
              <p className='text-muted-foreground'>
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <UserNav />
            </div>
          </div>

          <DataTable<Usuario, any>
            columns={columns}
            data={data}
          />
        </div>
      </div>
    </>
  );
}
