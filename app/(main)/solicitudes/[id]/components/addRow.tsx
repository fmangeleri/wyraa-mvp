'use client';

import { useSolicitudContext } from '../context/solicitudProvider';
import { TableCell, TableRow } from '@/components/ui/table';
import { Plus } from 'lucide-react';

export function AddRow({ imputaciones }: { imputaciones?: boolean }) {
  const { addProductos, addImputaciones } = useSolicitudContext();

  const handleAdd = () => {
    imputaciones ? addImputaciones() : addProductos();
  };

  return (
    <TableRow>
      <TableCell>
        <Plus onClick={handleAdd} />
      </TableCell>
      <TableCell onClick={handleAdd}>Agregar Producto</TableCell>
    </TableRow>
  );
}
