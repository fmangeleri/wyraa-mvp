'use client';

import React from 'react';
import { ValueDisplay } from './components/valueDisplay';

export function FacturaData() {
  return (
    <div className='rounded-3xl border-slate-100 p-4 my-4 flex justify-between border-2'>
      <div className='flex flex-col gap-1'>
        <ValueDisplay
          field='proveedor'
          label='Proveedor'
          factura={true}
        />
        <ValueDisplay
          field='cuit'
          label='CUIT'
          factura={true}
        />
        <ValueDisplay
          field='direccionProveedor'
          label='Direccion'
          factura={true}
        />
        <ValueDisplay
          field='fechaEmision'
          label='Fecha de Emision'
          factura={true}
        />

        <ValueDisplay
          field='fechaVencimiento'
          label='Fecha de Vencimiento'
          factura={true}
        />
      </div>
      <div className='flex flex-col gap-1 place-items-end'>
        <ValueDisplay
          field='nro'
          label='Factura'
          factura={true}
        />
        <ValueDisplay
          field='subtotal'
          label='Subtotal'
          factura={true}
          number={true}
        />
        <ValueDisplay
          field='impuestos'
          label='Impuestos'
          factura={true}
          number={true}
        />
        <ValueDisplay
          field='descuentos'
          label='Descuentos'
          factura={true}
          number={true}
        />
        <ValueDisplay
          field='total'
          label='Total'
          factura={true}
          number={true}
        />
      </div>
    </div>
  );
}
