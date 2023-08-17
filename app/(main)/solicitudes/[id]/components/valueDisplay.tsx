'use client';

import { useEffect, useState } from 'react';
import { Factura, FacturaSimple, Solicitud } from '../../data/types';
import { useSolicitudContext } from '../context/solicitudProvider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EnumSelect } from './EnumSelect';

export function ValueDisplay({
  label,
  field,
  factura,
  number,
  enumValues,
}: {
  label: string;
  field: keyof FacturaSimple | keyof Solicitud;
  factura: boolean;
  number?: boolean;
  enumValues?: Record<string, string>;
}) {
  const { onEdit, solicitud, setEditedSolicitud, setEditedFactura } =
    useSolicitudContext();
  const [displayValue, setDisplayedValue] = useState<any>();

  const value =
    solicitud.factura && solicitud.factura[field as keyof Factura] !== undefined
      ? solicitud.factura[field as keyof Factura]
      : solicitud[field as keyof Solicitud] !== undefined
      ? solicitud[field as keyof Solicitud]
      : '';

  useEffect(() => {
    setEditableFieldValue(value);
    if (number && typeof value === 'number') {
      setDisplayedValue(
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value)
      );
    }
  }, [value]);

  const [editableFieldValue, setEditableFieldValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = number
      ? parseFloat(event.target.value)
      : event.target.value;
    setEditableFieldValue(newValue);
    if (factura) {
      setEditedFactura(field, newValue);
    } else {
      setEditedSolicitud(field, newValue);
    }
  };

  const handleEnumInputChange = (newValue: string) => {
    setEditableFieldValue(newValue);
    setEditedSolicitud(field, newValue);
  };

  if (onEdit) {
    if (enumValues) {
      // Si se proporciona un enum, mostramos el EnumSelect
      return (
        <div className='flex items-center gap-2 w-48'>
          <Label htmlFor={field}>{label}: </Label>
          <EnumSelect
            enumValues={enumValues}
            selectedValue={editableFieldValue as string}
            setSelectedValue={handleEnumInputChange}
          />
        </div>
      );
    } else {
      // Si no hay enum, mostramos el Input
      return (
        <div className='flex items-center gap-2'>
          <Label htmlFor={field}>{label}: </Label>
          <Input
            id={field}
            value={editableFieldValue as string}
            onChange={(e) => handleInputChange(e)}
            className='h-8 w-48'
            type={number ? 'number' : 'text'}
          />
        </div>
      );
    }
  } else {
    return (
      <p className='text-gray-400 text-sm'>
        {label}:{'  '}
        <span className='text-gray-600 text-sm font-medium'>
          {number ? displayValue : value}
        </span>
      </p>
    );
  }

  // if (onEdit) {
  //   return (
  //     <div className='flex items-center gap-2'>
  //       <Label htmlFor={field}>{label}: </Label>
  //       <Input
  //         id={field}
  //         value={editableFieldValue}
  //         onChange={(e) => handleInputChange(e)}
  //         className='h-6 w-32'
  //         type={number ? 'number' : 'text'}
  //       />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <p className='text-gray-400 text-sm'>
  //       {label}:{'  '}
  //       <span className='text-gray-600 text-sm font-medium'>
  //         {number ? displayValue : value}
  //       </span>
  //     </p>
  //   );
  // }
}
