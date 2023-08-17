'use client';

import { auth, db } from '@/app/db/firebase';
import { Button } from '@/components/ui/button';
import { Estados, Solicitud, formatEnumKey } from '../../data/types';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useSolicitudContext } from '../../context/solicitudProvider';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { DialogClose } from '@radix-ui/react-dialog';
import { Roles, Usuario } from '@/app/(main)/equipo/data/types';

export function StateButton(props: {
  estado: keyof typeof Estados;
  id: string;
}) {
  // ; userId: string
  // const { newEstado, setNewEstado, solicitud } = useSolicitudContext();

  const [user, loading] = useAuthState(auth);
  const userId: string = (user?.uid as string) || '';

  const [comentario, setComentario] = useState('');
  const [newEstado, setNewEstado] = useState('');
  const [label, setLabel] = useState('');
  const [showRechazar, setShowRechazar] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | undefined>();

  const onUpdateState = async (
    // solicitud: Solicitud,
    id: string,
    userId: string,
    newEstado: string,
    comentario: string
  ) => {
    const ref = doc(db, 'solicitudes', id);
    const solicitudReq = await getDoc(ref);
    if (solicitudReq.exists()) {
      const solicitudOld = await solicitudReq.data();
      const solicitudUpdated = {
        estado: newEstado,
        firmas: [
          ...solicitudOld.firmas,
          {
            estado: newEstado,
            user: doc(db, 'usuarios', userId),
            fecha: new Date(),
            comentario: comentario,
          },
        ],
      };
      try {
        await updateDoc(ref, solicitudUpdated);
      } catch (error) {
        console.log(error);
      }
    }
    window.location.reload();
  };

  // let label = '';
  // var showRechazar = true;
  // switch (props.estado) {
  //   case 'solicitado':
  //     label = 'Autorizar';
  //     setNewEstado('autorizado');
  //     break;
  //   case 'autorizado':
  //     label = 'Controlar';
  //     setNewEstado('controlado');

  //     break;
  //   case 'rechazado':
  //     showRechazar = false;
  //     break;
  //   case 'controlado':
  //     label = 'Pagar';
  //     setNewEstado('pagado');
  //     break;
  //   case 'pagado':
  //     label = 'Finalizar';
  //     setNewEstado('finalizado');
  //     break;
  //   case 'finalizado':
  //     showRechazar = false;
  //     break;
  // }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const ref = doc(db, 'usuarios', user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUsuario(snap.data() as Usuario);
        }
      }
    };

    fetchData();
  }, [user]);

  useEffect(() => {
    switch (Estados[formatEnumKey(props.estado) as keyof typeof Estados]) {
      case Estados.Solicitado:
        if (usuario?.rol == Roles.Admin || usuario?.rol == Roles.Director) {
          setLabel('Autorizar');
          setNewEstado('Autorizado');
        }
        break;
      case Estados.Autorizado:
        if (
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Admin ||
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Director ||
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Contador
        ) {
          setLabel('Controlar');
          setNewEstado('Controlado');
        }
        break;
      case Estados.Rechazado:
        setShowRechazar(false);
        break;
      case Estados.Controlado:
        if (
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Admin ||
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Director ||
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Pagos
        ) {
          setLabel('Pagar');
          setNewEstado('Pagado');
        }
        break;
      case Estados.Pagado:
        if (
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Admin ||
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Director ||
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Contador ||
          Roles[usuario?.rol as keyof typeof Roles] == Roles.Pagos
        ) {
          setLabel('Finalizar');
          setNewEstado('Finalizado');
        }
        break;
      case Estados.Finalizado:
        setShowRechazar(false);
        break;
    }
    if (
      Estados[formatEnumKey(props.estado) as keyof typeof Estados] !=
        Estados.Rechazado &&
      Estados[formatEnumKey(props.estado) as keyof typeof Estados] !=
        Estados.Finalizado &&
      (Roles[usuario?.rol as keyof typeof Roles] == Roles.Admin ||
        Roles[usuario?.rol as keyof typeof Roles] == Roles.Director)
    ) {
      setShowRechazar(true);
    }
  }, [usuario]);

  if (showRechazar || label !== '') {
    return (
      <div className='bg-white w-full flex justify-center items-center py-3'>
        {showRechazar && (
          <Dialog>
            <DialogTrigger className='flex-1'>
              <Button
                variant='destructive'
                className='w-full mr-4'
              >
                Rechazar
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Estas seguro que quieres rechazar la solicitud?
                </DialogTitle>
                <DialogDescription>
                  <div className='my-4'>
                    <Label
                      htmlFor='comentario'
                      className='text-right'
                    >
                      Agrega un comentario
                    </Label>
                    <Input
                      id='comentario'
                      type='text'
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      className='col-span-1'
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button variant='destructive'>Cancelar</Button>
                </DialogClose>

                <DialogClose>
                  <Button
                    variant='green'
                    type='submit'
                    onClick={() =>
                      onUpdateState(props.id, userId, 'rechazado', comentario)
                    }
                  >
                    Confirmar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {label !== '' ? (
          <Dialog>
            <DialogTrigger className='flex-1'>
              <Button
                variant='secondary'
                className='w-full mr-4'
              >
                {label}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Estas seguro que quieres {label.toLowerCase()} la solicitud?
                </DialogTitle>
                <DialogDescription>
                  <div className='my-4'>
                    <Label
                      htmlFor='comentario'
                      className='text-right'
                    >
                      Agrega un comentario
                    </Label>
                    <Input
                      id='comentario'
                      type='text'
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      className='col-span-1'
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose>
                  <Button variant='destructive'>Cancelar</Button>
                </DialogClose>
                <DialogClose>
                  <Button
                    variant='green'
                    type='submit'
                    onClick={() =>
                      onUpdateState(props.id, userId, newEstado, comentario)
                    }
                  >
                    Confirmar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
    );
  }
}
