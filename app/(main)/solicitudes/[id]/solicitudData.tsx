'use client';

import React from 'react';
import { Pencil } from 'lucide-react';

import {
  Areas,
  EnPresupuesto,
  Prioridades,
  Solicitud,
  Tipos,
} from '../data/types';
import { useSolicitudContext } from './context/solicitudProvider';
import { ValueDisplay } from './components/valueDisplay';
import { Button } from '@/components/ui/button';

export function SolicitudData({ solicitud }: { solicitud: Solicitud }) {
  const { setSolicitud, setOnEdit, onEdit, saveAllChanges } =
    useSolicitudContext();

  setSolicitud(solicitud);

  const handleEdit = () => {
    setOnEdit(!onEdit);
  };

  return (
    <>
      <div className='absolute top-10 right-4 flex flex-col items-end'>
        <Pencil onClick={handleEdit} />
        {onEdit && (
          <div className='flex gap-2 mt-1'>
            <Button
              variant='secondary'
              size='sm'
              onClick={handleEdit}
            >
              Cancelar
            </Button>
            <Button
              variant='green'
              size='sm'
              onClick={saveAllChanges}
            >
              Guardar Cambios
            </Button>
          </div>
        )}
      </div>
      <div className='rounded-3xl border-slate-100 p-4 my-4 flex justify-between border-2'>
        <div className='flex flex-col gap-1'>
          <ValueDisplay
            field='tipo'
            label='Tipo'
            factura={false}
            enumValues={Tipos}
          />
          <ValueDisplay
            field='enPresupuesto'
            label='Esta en Presupuesto?'
            factura={false}
            enumValues={EnPresupuesto}
          />
          <ValueDisplay
            field='prioridad'
            label='Prioridad'
            factura={false}
            enumValues={Prioridades}
          />
        </div>
        <div className='flex flex-col gap-1 place-items-end'>
          <ValueDisplay
            field='area'
            label='Area'
            factura={false}
            enumValues={Areas}
          />
          <ValueDisplay
            field='tema'
            label='Tema'
            factura={false}
          />
          <ValueDisplay
            field='subtema'
            label='Subtema'
            factura={false}
          />
        </div>
      </div>
    </>
  );
}
