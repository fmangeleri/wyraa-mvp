'use client';

import { db } from '@/app/db/firebase';
import { Button } from '@/components/ui/button';
import { Solicitud } from '../data/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useSolicitudContext } from '../context/solicitudProvider';

export function StateButton(props: { estado: any; userId: string }) {
  const { newEstado, setNewEstado, solicitud } = useSolicitudContext();

  const onUpdateState = async (
    solicitud: Solicitud,
    userId: string,
    estado: string
  ) => {
    const ref = doc(db, 'solicitudes-prueba', solicitud.id);
    const solicitudReq = await getDoc(ref);
    if (solicitudReq.exists()) {
      const solicitudOld = await solicitudReq.data();
      const solicitudUpdated = {
        estado: estado,
        firmas: [
          ...solicitudOld.firmas,
          {
            estado: estado,
            user: doc(db, 'usuarios', userId),
            fecha: new Date(),
            comentario: '',
          },
        ],
      };
      try {
        await updateDoc(ref, solicitudUpdated);
      } catch (error) {
        console.log(error);
      }
    }
  };

  let label = '';
  let showRechazar = true;
  switch (props.estado) {
    case 'solicitado':
      label = 'Autorizar';
      setNewEstado('autorizado');
      break;
    case 'autorizado':
      label = 'Controlar';
      setNewEstado('controlado');

      break;
    case 'rechazado':
      showRechazar = false;
      break;
    case 'controlado':
      label = 'Pagar';
      setNewEstado('pagado');
      break;
    case 'pagado':
      label = 'Finalizar';
      setNewEstado('finalizado');
      break;
    case 'finalizado':
      showRechazar = false;
      break;
  }

  return (
    <>
      {showRechazar && (
        <Button
          variant='destructive'
          className='mr-4'
          onClick={() => onUpdateState(solicitud, props.userId, 'rechazado')}
        >
          Rechazar
        </Button>
      )}

      {label !== '' ? (
        <Button
          variant='secondary'
          onClick={() => onUpdateState(solicitud, props.userId, newEstado)}
        >
          {label}
        </Button>
      ) : null}
    </>
  );
}

// 'solicitado' | // todos
//   'autorizado' | // admin
//   'rechazado' | // rechazado
//   'controlado' | // controlador
//   'pagado' | //pagos
//   'finalizado'; // controlador
