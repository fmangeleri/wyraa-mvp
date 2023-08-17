'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import NuevaSolicitud from '../components/nuevaSolicitud';
import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Solicitud, estados, prioridades, tipos, areas } from './types';
import SolicitudCard from '../components/solicitud';
import { StateButton } from '../components/stateButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { auth, db } from '@/app/db/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import SolicitudProvider, {
  useSolicitudContext,
} from '../context/solicitudProvider';
// import { useUserContext } from '@/app/(main)/contexts/userProvider';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { solicitud, setSolicitud, showCard, setShowCard, newEstado } =
    useSolicitudContext();

  const openSolCard = (sol: Solicitud) => {
    setSolicitud(sol);
    setShowCard(true);
  };
  const closeSolCard = () => {
    setShowCard(false);
  };

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const router = useRouter();
  // const { user, loading, userId, usuario } = useUserContext();
  const [user, loading] = useAuthState(auth);
  const userId: string = user?.uid as string;

  const isFiltered =
    table.getPreFilteredRowModel().rows.length >
    table.getFilteredRowModel().rows.length;

  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filtrar proveedores...'
          value={
            (table.getColumn('proveedor')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('proveedor')?.setFilterValue(event.target.value)
          }
          className='max-w-xs'
        />
        <div className='flex flex-1 items-center space-x-2 mx-2'>
          {table.getColumn('area') && (
            <DataTableFacetedFilter
              column={table.getColumn('area')}
              title='Area'
              options={areas}
            />
          )}
          {table.getColumn('estado') && (
            <DataTableFacetedFilter
              column={table.getColumn('estado')}
              title='Estado'
              options={estados}
            />
          )}
          {table.getColumn('prioridad') && (
            <DataTableFacetedFilter
              column={table.getColumn('prioridad')}
              title='Prioridad'
              options={prioridades}
            />
          )}
          {table.getColumn('tipo') && (
            <DataTableFacetedFilter
              column={table.getColumn('tipo')}
              title='Tipo'
              options={tipos}
            />
          )}
          {isFiltered && (
            <Button
              variant='ghost'
              onClick={() => table.resetColumnFilters()}
              className='h-8 px-2 lg:px-3'
            >
              Reset
              <X className='ml-2 h-4 w-4' />
            </Button>
          )}
        </div>

        <div className='mx-4'>
          <Dialog>
            <DialogTrigger>
              <Button variant='secondary'>Nueva Solicitud</Button>
            </DialogTrigger>
            <NuevaSolicitud />
          </Dialog>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='ml-auto'
            >
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onDoubleClick={() =>
                    // router.push(`/solicitudes/${row.original.id}`)
                    openSolCard(row.original as Solicitud)
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {showCard && (
        <div className='fixed top-0 left-0 w-screen h-screen bg-gray-800 bg-opacity-50 flex items-center justify-center'>
          <div className='max-w-md w-full bg-white p-4 rounded-lg'>
            {/* <SolicitudCard solicitud={solicitud} /> */}
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la solicitud</CardTitle>
                <CardDescription>ID: {solicitud.id}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Área: {solicitud.area}</p>
                <p>Tema: {solicitud.tema}</p>
                <p>Tipo: {solicitud.tipo}</p>
                <p>Estado: {solicitud.estado}</p>
                <p>Prioridad: {solicitud.prioridad}</p>
                <p>Monto: {solicitud.monto}</p>
                <p>Proveedor: {solicitud.proveedor}</p>
                <p>Firmas:</p>
                {solicitud.firmas?.map((f, index) => (
                  <p key={index}>
                    {'       '}-{' '}
                    {f.estado.charAt(0).toUpperCase() + f.estado.slice(1)} por{' '}
                    {f.user.nombre} {f.user.apellido}
                  </p>
                ))}
                <div className='flex justify-between mt-4'>
                  <Button
                    variant='outline'
                    className='mr-4'
                    onClick={() => closeSolCard()}
                  >
                    Close
                  </Button>
                  <div>
                    {/* <Button
                      variant='destructive'
                      className='mr-4'
                    >
                      Rechazar
                    </Button>
                    <Button
                      variant='secondary'
                      onClick={() =>
                        onUpdateState(solicitud, userId, newEstado)
                      }
                    >
                      Autorizar
                    </Button> */}

                    <StateButton
                      estado={solicitud.firmas.at(-1)?.estado}
                      userId={userId}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
