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

export default async function SolicitudCard(props: { solicitud: Solicitud }) {
  const solicitud = props.solicitud;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Detalles de la solicitud</CardTitle>
          <CardDescription>ID: {solicitud.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Área: {solicitud.area}</p>
          <p>Tema: {solicitud.tema}</p>
          <p>Tipo: {solicitud.tipo}</p>
          <p>Estado: {solicitud.estado}</p>
          <p>Prioridad: {solicitud.prioridad}</p>
          <p>Monto: {solicitud.monto}</p>
          <p>Proveedor: {solicitud.proveedor}</p>
          <p>Firmas:</p>
          {solicitud.firmas?.map((f, index) => (
            <p key={index}>
              {'    '}- {f.estado.charAt(0).toUpperCase() + f.estado.slice(1)}{' '}
              por {f.user.nombre} {f.user.apellido}
            </p>
          ))}
          {/* <div className='flex justify-between mt-4'>
                  <Button
                    variant='outline'
                    className='mr-4'
                    onClick={() => closeSolCard()}
                  >
                    Close
                  </Button>
                  <div>
                    <Button
                      variant='destructive'
                      className='mr-4'
                    >
                      Rechazar
                    </Button>
                    <Button variant='secondary'>Autorizar</Button>
                  </div>
                </div> */}
        </CardContent>
      </Card>
    </>
  );
}
