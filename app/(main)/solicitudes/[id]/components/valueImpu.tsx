'use client';

import { useEffect, useState } from 'react';
import { Imputacion } from '../../data/types';
import { useSolicitudContext } from '../context/solicitudProvider';
import { Input } from '@/components/ui/input';
import { formatFechaDays } from '../context/functions';

export function ValueImpu({
  field,
  index,
  number,
  date,
}: {
  field: keyof Imputacion;
  index: number;
  number?: boolean;
  date?: boolean;
}) {
  const { onEdit, solicitud, setEditedImputaciones, editedImputaciones } =
    useSolicitudContext();
  const [displayValue, setDisplayedValue] = useState<any>();

  const value: string | number | Date =
    // solicitud.factura && solicitud.factura.Imputaciones[index][field] !== undefined
    editedImputaciones && editedImputaciones[index][field] !== undefined
      ? editedImputaciones[index][field]
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
    // if (date && typeof value != 'string' && typeof value != 'number') {
    //   setDisplayedValue(formatFechaDays(value));
    // }
  }, [date, number, value]);

  const [editableFieldValue, setEditableFieldValue] = useState(value);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = number
      ? parseFloat(event.target.value)
      : event.target.value;
    setEditableFieldValue(newValue);
    setEditedImputaciones(field, newValue, index);
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
