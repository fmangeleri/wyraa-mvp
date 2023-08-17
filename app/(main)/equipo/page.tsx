import { columns } from './data/columns';
import { Usuario } from './data/types';
import { DataTable } from './data/data-table';
import { db } from '@/app/db/firebase';

import { getDocs, collection } from 'firebase/firestore';

async function getData(): Promise<Usuario[]> {
  // Fetch data from your API here.
  const ref = collection(db, 'usuarios');

  try {
    const users = await getDocs(ref);
    const usersFiltered = users.docs.map((doc) => {
      // const { fecha, ...rest } = doc.data();
      const docAll = {
        id: doc.id,
        ...doc.data(),
      } as Usuario;
      return docAll;
    });
    return usersFiltered;
  } catch (err) {
    console.error(err);
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <DataTable<Usuario, any>
      columns={columns}
      data={data}
    />
  );
}
