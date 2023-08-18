'use client';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';

import React, { ChangeEvent } from 'react';
import { SetStateAction, useState } from 'react';
import { auth, db, storage } from '@/app/db/firebase';
import { collection, addDoc, doc } from 'firebase/firestore';
import { uploadBytes, ref } from 'firebase/storage';
import {
  Areas,
  EnPresupuesto,
  Estados,
  ImputacionNew,
  ImputacionesNew,
  Prioridades,
  SolicitudNew,
  Tipos,
  formatEnumKey,
} from '../data/types';
import { cn } from '@/lib/utils';
import { getInvoiceData } from '@/app/functions/ocr';

import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuthState } from 'react-firebase-hooks/auth';
import { DialogClose } from '@radix-ui/react-dialog';
import { parseDate, transformToNumber } from '../[id]/context/functions';
import { toast } from '@/components/ui/use-toast';

interface Props {
  onFileUpload: (file: File) => void;
}

export default function NuevaSolicitud() {
  const [area, setArea] = useState('');
  const [openArea, setOpenArea] = useState(false);
  const [tema, setTema] = useState('');
  const [subtema, setSubtema] = useState('');
  const [monto, setMonto] = useState<number>();
  const [proveedor, setProveedor] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [openPrioridad, setOpenPrioridad] = useState(false);
  const [enPresupuesto, setEnPresupuesto] = useState('');
  const [openEnPresupuesto, setOpenEnPresupuesto] = useState(false);
  const [tipo, setTipo] = useState('');
  const [openTipo, setOpenTipo] = useState(false);
  const [comentario, setComentario] = useState('');
  const [file, setFile] = useState<File>();

  const [user, loading] = useAuthState(auth);
  const userId: string = user?.uid as string;

  const handleSubmit = async () => {
    const imputacion: ImputacionNew[] = [
      {
        fecha: new Date(),
        centroDeCosto: tema,
        cuenta: subtema,
        monto: monto || 0,
      },
    ];
    const imputaciones: ImputacionesNew = {
      data: imputacion,
    };

    let impoId: string | null = null;
    try {
      const imputacionesCollectionRef = collection(db, 'imputaciones');
      const newImpo = await addDoc(imputacionesCollectionRef, imputaciones);
      impoId = newImpo.id;
      console.log(newImpo);
    } catch (error) {
      console.log(error);
    }

    const nuevaSolicitud: SolicitudNew = {
      area: Areas[formatEnumKey(area) as keyof typeof Areas],
      tema: tema,
      subtema: subtema,
      enPresupuesto: EnPresupuesto[enPresupuesto as keyof typeof EnPresupuesto],
      estado: Estados.Solicitado,
      prioridad: Prioridades[prioridad as keyof typeof Prioridades],
      monto: monto || 0,
      proveedor: proveedor,
      tipo: Tipos[tipo as keyof typeof Tipos],
      imputaciones: impoId
        ? { data: doc(db, 'imputaciones', impoId), id: impoId }
        : { data: null, id: '' },
      firmas: [
        {
          estado: Estados.Solicitado,
          fecha: new Date(),
          user: doc(db, 'usuarios', userId),
          comentario: comentario,
        },
      ],
    };

    try {
      if (file) {
        const invoice = await getInvoiceData(file);
        nuevaSolicitud.factura = {
          nro: invoice.InvoiceId?.content || null,
          fechaEmision: parseDate(invoice.InvoiceDate?.content) || null,
          fechaVencimiento: parseDate(invoice.DueDate?.content) || null,
          proveedor: invoice.VendorName?.content || null,
          direccionProveedor: invoice.VendorAddress?.content || null,
          // cliente: invoice?.CustomerName?.content || null,
          // direccionCliente: invoice?.CustomerAddress?.content || null,
          cuit: invoice.VendorTaxId?.content || null,
          // ingBrutos: null,
          subtotal: transformToNumber(invoice.Subtotal?.content) || 0,
          impuestos: transformToNumber(invoice.TotalTax?.content) || 0,
          descuentos: transformToNumber(invoice.TotalDiscount?.content) || 0,
          total:
            transformToNumber(invoice.AmountDue?.content) ||
            transformToNumber(invoice.InvoiceTotal?.content) ||
            transformToNumber(invoice.Subtotal?.content) ||
            0,
          productos: [],
        };

        for (const { properties: item } of invoice.Items?.values ?? []) {
          nuevaSolicitud.factura?.productos?.push({
            descripcion: item.Description?.content || null,
            cantidad: transformToNumber(item.Quantity?.content) || 1,
            unidad: item.Unit?.content || 'unidad',
            precioUnitario:
              transformToNumber(item.UnitPrice?.content) ||
              transformToNumber(item.Amount?.content) ||
              null,
            impuesto: transformToNumber(item.Tax?.content) || null,
            total:
              transformToNumber(item.Amount?.content) ||
              nuevaSolicitud.monto ||
              null,
          });
        }
      }
      const solicitudesCollectionRef = collection(db, 'solicitudes');
      const newDoc = await addDoc(solicitudesCollectionRef, nuevaSolicitud);
      if (file) {
        const storageRef = ref(storage, `facturas/${newDoc.id}`);
        await uploadBytes(storageRef, file).then((snapshot) => {
          console.log(snapshot);
        });
      }
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast({
        variant: 'destructive',
        title: 'Hubo un error',
        description: 'Complete todos los campos',
      });
      window.location.reload();
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <DialogContent className='h-fit'>
      <DialogHeader>
        <DialogTitle>Nueva Solicitud</DialogTitle>
        <DialogDescription>
          Complete los datos de la nueva solicitud
        </DialogDescription>
      </DialogHeader>
      <div className='grid gap-2'>
        {/* <div className='grid grid-cols-3 gap-4'> */}
        <div className='flex flex-row gap-2'>
          <div className='flex-1'>
            <Label
              htmlFor='tipo'
              className='text-right'
            >
              Tipo
            </Label>
            <Popover
              open={openTipo}
              onOpenChange={setOpenTipo}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openTipo}
                  className='w-full justify-between'
                >
                  {tipo
                    ? Tipos[tipo as keyof typeof Tipos]
                    : // tipos.find((p) => p.value === tipo)?.label
                      'Seleccionar...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-full p-0'>
                <Command>
                  <CommandGroup>
                    {/* {tipos.map((p) => ( */}
                    {Object.keys(Tipos).map((key) => {
                      const value = Tipos[key as keyof typeof Tipos];
                      return (
                        <CommandItem
                          key={value}
                          onSelect={(currentTipo: SetStateAction<string>) => {
                            setTipo(currentTipo === tipo ? '' : value);
                            setOpenTipo(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              tipo === value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {value}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex-1'>
            <Label
              htmlFor='prioridad'
              className='text-right'
            >
              Prioridad
            </Label>
            <Popover
              open={openPrioridad}
              onOpenChange={setOpenPrioridad}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openPrioridad}
                  className='w-full justify-between'
                >
                  {prioridad
                    ? // ? prioridades.find((p) => p.value === prioridad)?.label
                      Prioridades[prioridad as keyof typeof Prioridades]
                    : 'Seleccionar...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-full p-0'>
                <Command>
                  <CommandGroup>
                    {/* {prioridades.map((p) => ( */}
                    {Object.keys(Prioridades).map((key) => {
                      const value =
                        Prioridades[key as keyof typeof Prioridades];
                      return (
                        <CommandItem
                          key={value}
                          onSelect={(
                            currentPrioridad: SetStateAction<string>
                          ) => {
                            setPrioridad(
                              currentPrioridad === prioridad ? '' : value
                            );
                            setOpenPrioridad(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              prioridad === value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {value}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex-1'>
            <Label
              htmlFor='enPresupuesto'
              className='text-right'
            >
              Esta en Presupuesto?
            </Label>
            <Popover
              open={openEnPresupuesto}
              onOpenChange={setOpenEnPresupuesto}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openEnPresupuesto}
                  className='w-full justify-between'
                >
                  {enPresupuesto
                    ? // ? prioridades.find((p) => p.value === enPresupuesto)?.label
                      EnPresupuesto[enPresupuesto as keyof typeof EnPresupuesto]
                    : 'Seleccionar...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-full p-0'>
                <Command>
                  <CommandGroup>
                    {Object.keys(EnPresupuesto).map((key) => {
                      const value =
                        EnPresupuesto[key as keyof typeof EnPresupuesto];
                      return (
                        <CommandItem
                          key={value}
                          onSelect={(
                            currentEnPresupuesto: SetStateAction<string>
                          ) => {
                            setEnPresupuesto(
                              currentEnPresupuesto === enPresupuesto
                                ? ''
                                : value
                            );
                            setOpenEnPresupuesto(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              enPresupuesto === value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                          {value}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className='flex flex-row gap-2'>
          <div className='flex-1'>
            <Label
              htmlFor='area'
              className='text-right'
            >
              Area
            </Label>
            <Popover
              open={openArea}
              onOpenChange={setOpenArea}
            >
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  role='combobox'
                  aria-expanded={openArea}
                  className='w-full justify-between'
                >
                  {area
                    ? Areas[formatEnumKey(area) as keyof typeof Areas]
                    : 'Seleccionar...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-full p-0'>
                <Command>
                  <CommandGroup>
                    {Object.keys(Areas).map((key) => {
                      const value = Areas[key as keyof typeof Areas];
                      return (
                        <CommandItem
                          key={value}
                          onSelect={(currentArea: SetStateAction<string>) => {
                            setArea(currentArea === area ? '' : value);
                            setOpenArea(false);
                          }}
                        >
                          <Check
                            className={cn(
                              'mr-2 h-4 w-4',
                              area === value ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                          {value}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex-1'>
            <Label
              htmlFor='tema'
              className='text-right'
            >
              Tema
            </Label>
            <Input
              id='tema'
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className='col-span-1'
            />
          </div>
          <div className='flex-1'>
            <Label
              htmlFor='subtema'
              className='text-right'
            >
              Subtema
            </Label>
            <Input
              id='subtema'
              value={subtema}
              onChange={(e) => setSubtema(e.target.value)}
              className='col-span-1'
            />
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label
              htmlFor='proveedor'
              className='text-right'
            >
              Proveedor
            </Label>
            <Input
              id='proveedor'
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              className='col-span-1'
            />
          </div>
          <div>
            <Label
              htmlFor='monto'
              className='text-right'
            >
              Monto
            </Label>
            <Input
              id='monto'
              type='number'
              value={monto}
              onChange={(e) => setMonto(Number(e.target.value))}
              className='col-span-1'
            />
          </div>
        </div>
        <div className='grid grid-cols-1 gap-4'>
          <div className='col-span-1'>
            <Label
              htmlFor='monto'
              className='text-right'
            >
              Comentario
            </Label>
            <Input
              id='comentario'
              type='string'
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className='col-span-1'
            />
          </div>
        </div>
        <div className='grid grid-cols-1 mt-1'>
          <div className='col-span-1 grid w-full items-center gap-1.5'>
            <Label htmlFor='picture'>Cargar Factura</Label>
            <Input
              className='w-full'
              id='picture'
              type='file'
              onChange={handleFileInputChange}
            />
          </div>
          {/* <label
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              htmlFor='file_input'
            >
              Upload file
            </label>
            <input
              className='block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
              aria-describedby='file_input_help'
              id='file_input'
              type='file'
              onChange={handleFileInputChange}
            />
            <p
              className='mt-1 text-sm text-gray-500 dark:text-gray-300'
              id='file_input_help'
            >
              SVG, PNG, JPG or GIF (MAX. 800x400px).
            </p> */}
        </div>
      </div>
      <DialogFooter>
        <DialogClose>
          <Button
            type='submit'
            onClick={handleSubmit}
          >
            Crear Solicitud
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
