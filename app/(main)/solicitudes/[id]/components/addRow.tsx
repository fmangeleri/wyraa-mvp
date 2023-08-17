'use client';

import { useEffect, useState } from 'react';
import { Producto } from '../../data/types';
import { useSolicitudContext } from '../context/solicitudProvider';
import { Input } from '@/components/ui/input';
import { TableCell, TableRow } from '@/components/ui/table';
import { Plus, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

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
