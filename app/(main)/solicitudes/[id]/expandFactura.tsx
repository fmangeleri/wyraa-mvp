'use client';

import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

import React from 'react';
import { useSolicitudContext } from './context/solicitudProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ValueTable } from './components/valueTable';
import { DeleteRow } from './components/deleteRow';
import { AddRow } from './components/addRow';
import { ValueImpu } from './components/valueImpu';

export function ExpandFactura() {
  const { solicitud, onEdit, editedProductos, editedImputaciones } =
    useSolicitudContext();

  return (
    <div className='flex flex-col gap-4 m-4'>
      <Accordion
        type='single'
        collapsible
      >
        <AccordionItem value='item-1'>
          <AccordionTrigger>Productos</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableCaption>Listado de productos de la factura</TableCaption>
              <TableHeader>
                <TableRow>
                  {onEdit && <TableHead>Eliminar</TableHead>}
                  <TableHead className='w-full'>Descripcion</TableHead>
                  <TableHead>Cantidad</TableHead>
                  <TableHead>Unidad</TableHead>
                  <TableHead>Precio Unitario</TableHead>
                  <TableHead>Impuesto</TableHead>
                  <TableHead className='text-right'>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solicitud && solicitud.factura && editedProductos ? (
                  // solicitud.factura.productos?.map((product, index) => (
                  editedProductos?.map((product, index) => (
                    <TableRow key={index}>
                      {onEdit && (
                        <TableCell className='flex items-center justify-center'>
                          <DeleteRow index={index} />
                        </TableCell>
                      )}
                      <TableCell className='font-medium'>
                        <ValueTable
                          field='descripcion'
                          index={index}
                        />
                      </TableCell>
                      <TableCell>
                        <ValueTable
                          field='cantidad'
                          index={index}
                        />
                      </TableCell>
                      <TableCell>
                        <ValueTable
                          field='unidad'
                          index={index}
                        />
                      </TableCell>
                      <TableCell>
                        <ValueTable
                          field='precioUnitario'
                          index={index}
                          number={true}
                        />
                      </TableCell>
                      <TableCell>
                        <ValueTable
                          field='impuesto'
                          index={index}
                          number={true}
                        />
                      </TableCell>
                      <TableCell className='text-right'>
                        <ValueTable
                          field='total'
                          index={index}
                          number={true}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p>No hay productos</p>
                )}
                {onEdit && <AddRow />}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value='item-2'>
          <AccordionTrigger>Imputaciones</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableCaption>Listado de imputaciones</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className='w-[100px]'>Fecha</TableHead>
                  <TableHead>Centro de costo</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead className='text-right'>Monto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {solicitud &&
                solicitud.imputaciones?.data &&
                editedImputaciones ? (
                  editedImputaciones?.map((imputacion, index) => (
                    <TableRow key={index}>
                      {onEdit && (
                        <TableCell className='flex items-center justify-center'>
                          <DeleteRow
                            index={index}
                            imputaciones={true}
                          />
                        </TableCell>
                      )}
                      <TableCell className='font-medium'>
                        <ValueImpu
                          field='fecha'
                          index={index}
                        />
                      </TableCell>
                      <TableCell>
                        <ValueImpu
                          field='centroDeCosto'
                          index={index}
                        />
                      </TableCell>
                      <TableCell>
                        <ValueImpu
                          field='cuenta'
                          index={index}
                        />
                      </TableCell>
                      <TableCell className='text-right'>
                        <ValueImpu
                          field='monto'
                          index={index}
                          number={true}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <p>No hay productos</p>
                )}
                {onEdit && <AddRow imputaciones={true} />}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
