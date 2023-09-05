'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Areas,
  Estados,
  Prioridades,
  Solicitud,
  Tipos,
  formatEnumKey,
} from './types';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<Solicitud>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label='Select all'
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label='Select row'
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'proveedor',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Proveedor
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const prov: string = row.getValue('proveedor');

      return <div className='ml-4 font-medium'>{prov}</div>;
    },
  },
  {
    accessorKey: 'area',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Area'
      />
    ),
    cell: ({ row }) => {
      // const area = areas.find((area) => area.value === row.getValue('area'));

      // if (!area) {
      //   return null;
      // }

      const areaKey = row.getValue('area');
      const areaLabel =
        Areas[formatEnumKey(areaKey as string) as keyof typeof Areas];

      if (!areaLabel) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {/* {area.icon && (
            <area.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )} */}
          <span>{areaLabel}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'tema',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tema
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'tipo',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Tipo'
      />
    ),
    cell: ({ row }) => {
      // const tipo = tipos.find((tipo) => tipo.value === row.getValue('tipo'));

      // if (!tipo) {
      //   return null;
      // }

      const tipoKey = row.getValue('tipo') as keyof typeof Tipos;
      const tipoLabel = Tipos[tipoKey];

      if (!tipoLabel) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {/* {tipo.icon && (
            <tipo.icon className='mr-2 h-4 w-4 text-muted-foreground' />
          )} */}
          <span>{tipoLabel}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'estado',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Estado'
      />
    ),
    cell: ({ row }) => {
      // const estado = estados.find(
      //   (estado) => estado.value === row.getValue('estado')
      // );

      // if (!estado) {
      //   return null;
      // }

      const estadoKey = row.getValue('estado') as keyof typeof Estados;
      const estadoLabel = Estados[estadoKey];

      if (!estadoLabel) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {/* {estado.icon && (
            <estado.icon
              className={`mr-2 h-4 w-4 text-muted-foreground ${estado.color}`}
            />
          )} */}
          <span>{estadoLabel}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'prioridad',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Prioridad'
      />
    ),
    cell: ({ row }) => {
      // const prioridad = prioridades.find(
      //   (prioridad) => prioridad.value === row.getValue('prioridad')
      // );

      // if (!prioridad) {
      //   return null;
      // }

      const prioridadKey = row.getValue(
        'prioridad'
      ) as keyof typeof Prioridades;
      const prioridadLabel = Prioridades[prioridadKey];

      if (!prioridadLabel) {
        return null;
      }

      return (
        <div className='flex items-center'>
          {/* {prioridad.icon && (
            <prioridad.icon
              className={`mr-2 h-4 w-4 text-muted-foreground ${prioridad.color}`}
            />
          )} */}
          <span>{prioridadLabel}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: 'monto',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Monto
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('monto'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className='text-center font-medium'>{formatted}</div>;
    },
  },
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button
  //             variant='ghost'
  //             className='h-8 w-8 p-0'
  //           >
  //             <span className='sr-only'>Open menu</span>
  //             <MoreHorizontal className='h-4 w-4' />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align='end'>
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];
