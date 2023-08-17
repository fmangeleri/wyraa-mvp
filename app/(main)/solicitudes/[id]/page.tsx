'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { db } from '@/app/db/firebase';
import { Solicitud } from '../data/types';
import { ArrowLeft } from 'lucide-react';

import { collection, getDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

async function getData(id: string): Promise<any> {
  // Fetch data from your API here.
  const ref = collection(db, 'solicitudes-prueba');

  try {
    const data = await getDoc(doc(ref, id));
    const dataFiltered: Solicitud = data.data() as Solicitud;

    return dataFiltered;
  } catch (err) {
    console.error(err);
  }
}

export default async function Page({ params }: any) {
  const { id } = params;
  const router = useRouter();

  const solicitud = await getData(id as string);

  return (
    <Card>
      <CardHeader>
        <ArrowLeft onClick={() => router.back()} />
        <CardTitle>Detalles de la solicitud</CardTitle>
        <CardDescription>ID: {id}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Área: {solicitud.area}</p>
        <p>Tema: {solicitud.tema}</p>
        <p>Tipo: {solicitud.tipo}</p>
        <p>Estado: {solicitud.estado}</p>
        <p>Prioridad: {solicitud.prioridad}</p>
        <p>Monto: {solicitud.monto}</p>
        <p>Proveedor: {solicitud.proveedor}</p>
        <p>Solicitante: {solicitud.solicitante.user}</p>
      </CardContent>
    </Card>
  );
}
