import { columns } from './data/columns';
import { Firma, FirmaReq, Solicitud, SolicitudReq } from './data/types';
import { DataTable } from './data/data-table';
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
  const ref = collection(db, 'solicitudes');
  try {
    const solicitudes = await getDocs(ref);
    const solFiltered = await Promise.all(
      solicitudes.docs.map(async (doc) => {
        const { firmas, factura, imputaciones, ...rest } =
          doc.data() as SolicitudReq;
        const areImputaciones = imputaciones?.data ? {} : undefined;
        const firmasFiltered: FirmaReq[] = await Promise.all(
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
          imputaciones: { data: areImputaciones, id: imputaciones?.id },
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
    <SolicitudProvider>
      {/* <UserProvider> */}
      <DataTable<Solicitud, any>
        columns={columns}
        data={data}
      />
      {/* </UserProvider> */}
    </SolicitudProvider>
  );
}
