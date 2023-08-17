'use client';

import { useEffect, useState } from 'react';
import { Producto } from '../../data/types';
import { useSolicitudContext } from '../context/solicitudProvider';
import { Input } from '@/components/ui/input';

export function ValueTable({
  field,
  index,
  number,
}: {
  field: keyof Producto;
  index: number;
  number?: boolean;
}) {
  const { onEdit, solicitud, setEditedProductos, editedProductos } =
    useSolicitudContext();
  const [displayValue, setDisplayedValue] = useState<any>();

  const value =
    // solicitud.factura && solicitud.factura.productos[index][field] !== undefined
    editedProductos && editedProductos[index][field] !== undefined
      ? editedProductos[index][field]
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
    setEditedProductos(field, newValue, index);
  };

  if (onEdit) {
    return (
      <Input
        id={field}
        value={editableFieldValue}
        onChange={(e) => handleInputChange(e)}
        className='h-6 w-32'
        type={number ? 'number' : 'text'}
      />
    );
  } else {
    return <>{number ? displayValue : value}</>;
  }
}
