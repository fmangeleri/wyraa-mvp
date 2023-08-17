'use client';

import { useSolicitudContext } from '../context/solicitudProvider';
import { TableCell } from '@/components/ui/table';
import { X } from 'lucide-react';
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

export function DeleteRow({
  index,
  imputaciones,
}: {
  index: number;
  imputaciones?: boolean;
}) {
  const { deleteProductos, deleteImputaciones } = useSolicitudContext();

  const handleInputChange = () => {
    imputaciones ? deleteImputaciones(index) : deleteProductos(index);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <TableCell className='flex items-center justify-center'>
          <X className='text-red-500 transition-transform transform hover:scale-110' />
        </TableCell>
      </DialogTrigger>
      <DialogContent className='my-4'>
        <DialogHeader>
          <DialogTitle>
            Estas seguro que quieres eliminar{' '}
            {imputaciones ? 'la imputacion' : 'el producto'}?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className='flex justify-center mt-4'>
          <DialogClose>
            <Button variant='destructive'>Cancelar</Button>
          </DialogClose>

          <DialogClose>
            <Button
              variant='green'
              type='submit'
              onClick={handleInputChange}
            >
              Confirmar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
