import { db } from '@/app/db/firebase';
import {
  DocumentReference,
  Timestamp,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import {
  FacturaNew,
  FacturaUpdate,
  Firma,
  FirmaReq,
  Imputacion,
  ImputacionesNew,
  SolicitudUpdate,
} from '../../data/types';

import firebase from 'firebase/app';
import 'firebase/firestore';
import { useRouter } from 'next/navigation';

export const onUpdateStateImputaciones = async (
  id: string,
  editedData: Imputacion[]
) => {
  const ref = doc(db, 'imputaciones', id);

  const formattedData = editedData.map((imputacion) => {
    if ('fecha' in imputacion) {
      return {
        ...imputacion,
        fecha: parseDate(imputacion.fecha),
      };
    }
    return imputacion;
  });
  try {
    await updateDoc(ref, { data: formattedData });
  } catch (error) {
    console.log(error);
  }
  window.location.reload();
};

export const onUpdateStateSolicitud = async (
  id: string,
  editedData: SolicitudUpdate
) => {
  const ref = doc(db, 'solicitudes', id);

  const facturaParsed: FacturaUpdate = {};

  if (editedData) {
    if (
      editedData['factura.fechaEmision'] &&
      typeof editedData['factura.fechaEmision'] == 'string'
    ) {
      facturaParsed['factura.fechaEmision'] = parseDate(
        editedData['factura.fechaEmision']
      );
    }
    if (
      editedData['factura.fechaVencimiento'] &&
      typeof editedData['factura.fechaVencimiento'] == 'string'
    ) {
      facturaParsed['factura.fechaVencimiento'] = parseDate(
        editedData['factura.fechaVencimiento']
      );
    }
    Object.assign(editedData, facturaParsed);
    console.log(editedData);
  }

  try {
    await updateDoc(ref, editedData);
  } catch (error) {
    console.log(error);
  }
  window.location.reload();
};

// export const onUpdateStateFactura = async (
//   id: string,
//   editedData: FacturaOptional
// ) => {
//   const ref = doc(db, 'solicitudes', id);
//   try {
//     await updateDoc(ref, {
//       factura: editedData,
//     });
//   } catch (error) {
//     console.log(error);
//   }

//   window.location.reload();
// };

// Date to string DD/MM/YYYY hh:mm
export function formatFecha(fecha: Date): string {
  // const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1;
  const day = fecha.getDate();
  const hours = fecha.getHours();
  const minutes = fecha.getMinutes();
  return `${month.toString().padStart(2, '0')}/${day
    .toString()
    .padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}

// Date to string DD/MM/YYYY
export function formatFechaDays(fecha: Date): string {
  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1;
  const day = fecha.getDate();
  return `${day.toString().padStart(2, '0')}/${month
    .toString()
    .padStart(2, '0')}/${year}`;
}

// string DD/MM/YYYY to Date
export function parseDate(dateString: string) {
  const [day, month, year] = dateString.split('/');
  // const [day, month, year] = dateString.split('-');

  const formattedDay = parseInt(day, 10);
  const formattedMonth = parseInt(month, 10) - 1;
  const formattedYear = parseInt(year, 10);
  return new Date(formattedYear, formattedMonth, formattedDay);
}

// string "$ 10.000,20" to number "10000.2"
export function transformToNumber(value: any) {
  if (typeof value === 'string') {
    const cleanedValue = value.replace(/[$.]/g, '').replace(',', '.');
    // Convertimos el string limpio a un número
    return parseFloat(cleanedValue);
  } else if (typeof value === 'number') {
    return value; // Si ya es un número, lo retornamos tal cual
  } else {
    return undefined; // Si no es ni string ni number, retornamos NaN (Not a Number)
  }
}

export function transformFactura(factura: FacturaNew) {
  // let fE: Date | null = null;
  // if (factura.fechaEmision && !(factura.fechaEmision instanceof Date)) {
  //   fE = factura.fechaEmision?.toDate();
  // } else if (factura.fechaEmision) {
  //   fE = factura.fechaEmision;
  // }
  let fE: Date | null = null;
  if (factura.fechaEmision && !(factura.fechaEmision instanceof Date)) {
    fE = (factura.fechaEmision as Timestamp).toDate();
  } else if (factura.fechaEmision) {
    fE = factura.fechaEmision;
  }
  const fechaEmisionFormated = fE ? formatFechaDays(fE) : '';
  let fV: Date | null = null;
  if (factura.fechaVencimiento && !(factura.fechaVencimiento instanceof Date)) {
    fV = (factura.fechaVencimiento as Timestamp).toDate();
  } else {
    fV = factura.fechaVencimiento;
  }
  const fechaVencimientoFormated = fV ? formatFechaDays(fV) : '';
  const facturaFiltered = {
    ...factura,
    fechaEmision: fechaEmisionFormated,
    fechaVencimiento: fechaVencimientoFormated,
  };
  return facturaFiltered;
}

export async function transformImputacion(imputaciones: DocumentReference) {
  try {
    const impuDoc = await getDoc(imputaciones);

    const impuData: ImputacionesNew | null = impuDoc.exists()
      ? (impuDoc.data() as ImputacionesNew)
      : null;

    if (impuData) {
      let imputacionesFiltered: Imputacion[] = [];

      impuData?.data?.map((imputacion, index) => {
        let fechaImpu: Date = new Date();
        if (imputacion.fecha && !(imputacion.fecha instanceof Date)) {
          fechaImpu = (imputacion.fecha as Timestamp).toDate();
        } else {
          fechaImpu = imputacion.fecha;
        }
        const fechaImpuPlana = formatFechaDays(fechaImpu);
        const imputacionFiltered: Imputacion = {
          ...imputacion,
          fecha: fechaImpuPlana,
        };
        imputacionesFiltered.push(imputacionFiltered);
      });
      return imputacionesFiltered;
    }
  } catch (error) {
    console.log(error);
  }
}

// : Promise<Firma[]>
export async function transformFirmas(firmas: FirmaReq[]) {
  const transformedFirmas: Firma[] = await Promise.all(
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
      return { ...fRest, fecha: fechaPlana, user: userData } as Firma;
    })
  );
  return transformedFirmas;
}
