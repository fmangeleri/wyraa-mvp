import { columns } from './data/columns';
import { Firma, FirmaReq, Solicitud } from './data/types';
import { DataTable } from './data/data-table';
import { UserNav } from '../../components/userNav';
import { db, auth } from '@/app/db/firebase';

import { getDocs, collection, getDoc } from 'firebase/firestore';
import SolicitudProvider from './context/solicitudProvider';
import UserProvider from '@/app/(main)/contexts/userProvider';

function formatFecha(fecha: Date): string {
  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1;
  const day = fecha.getDate();
  const hours = fecha.getHours();
  const minutes = fecha.getMinutes();
  return `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

async function getData(): Promise<Solicitud[]> {
  const ref = collection(db, 'solicitudes-prueba');
  try {
    const solicitudes = await getDocs(ref);
    const solFiltered = await Promise.all(
      solicitudes.docs.map(async (doc) => {
        const { firmas, ...rest } = doc.data();
        const firmasFiltered: Firma[] = await Promise.all(
          firmas.map(async (f: FirmaReq) => {
            const { fecha, user, ...fRest } = f;
            const userDoc = await getDoc(user);
            const userData = userDoc.exists() ? userDoc.data() : null;
            let fechaDate: Date = new Date();
            if (!(f.fecha instanceof Date)) {
              fechaDate = f.fecha.toDate();
            } else {
              fechaDate = f.fecha;
            }
            const fechaPlana = formatFecha(fechaDate);
            return { ...fRest, fecha: fechaPlana, user: userData };
          })
        );
        const docAll: Solicitud = {
          ...rest,
          id: doc.id,
          firmas: firmasFiltered,
        } as Solicitud;
        return docAll;
      })
    );
    return solFiltered;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <div className='col-span-5 border-l'>
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
          <SolicitudProvider>
            {/* <UserProvider> */}
            <DataTable<Solicitud, any>
              columns={columns}
              data={data}
            />
            {/* </UserProvider> */}
          </SolicitudProvider>
        </div>
      </div>
    </>
  );
}
