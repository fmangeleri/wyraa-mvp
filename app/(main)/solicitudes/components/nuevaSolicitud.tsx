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
import { Solicitud, areas, prioridades, tipos } from '../data/types';
import { cn } from '@/lib/utils';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
  onFileUpload: (file: File) => void;
}

export default function NuevaSolicitud() {
  const [area, setArea] = useState('');
  const [openArea, setOpenArea] = useState(false);
  const [tema, setTema] = useState('');
  const [monto, setMonto] = useState<number>();
  const [proveedor, setProveedor] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [openPrioridad, setOpenPrioridad] = useState(false);
  const [tipo, setTipo] = useState('');
  const [openTipo, setOpenTipo] = useState(false);
  const [comentario, setComentario] = useState('');
  const [file, setFile] = useState<File>();

  const solicitudesCollectionRef = collection(db, 'solicitudes-prueba');

  const [user, loading] = useAuthState(auth);
  const userId: string = user?.uid as string;

  const handleSubmit = async () => {
    const nuevaSolicitud = {
      area: area.toLowerCase(),
      tema: tema,
      estado: 'solicitado',
      prioridad: prioridad.toLowerCase(),
      monto: monto,
      proveedor: proveedor,
      tipo: tipo.toLowerCase(),
      firmas: [
        {
          estado: 'solicitado',
          fecha: new Date(),
          user: doc(db, 'usuarios', userId),
          comentario: comentario,
        },
      ],
    };

    try {
      const newDoc = await addDoc(solicitudesCollectionRef, nuevaSolicitud);
      const storageRef = ref(storage, `facturas/${newDoc.id}`);
      // await uploadBytes(storageRef, file).then((snapshot) => {
      //   console.log('Uploaded a blob or file!');
      // });
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files && event.target.files[0];
    if (file) {
      setFile(file);
      console.log(file);
    }
  };

  return (
    <DialogContent className='sm:max-w-[500px]'>
      <DialogHeader>
        <DialogTitle>Nueva Solicitud</DialogTitle>
        <DialogDescription>
          Complete los datos de la nueva solicitud
        </DialogDescription>
      </DialogHeader>
      <div className='grid gap-4 py-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
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
                  className='w-[200px] justify-between'
                >
                  {area
                    ? areas.find((p) => p.value === area)?.label
                    : 'Seleccionar...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandGroup>
                    {areas.map((p) => (
                      <CommandItem
                        key={p.value}
                        onSelect={(currentArea: SetStateAction<string>) => {
                          setArea(currentArea === area ? '' : currentArea);
                          setOpenArea(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            area === p.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {p.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div>
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
        </div>
        <div className='grid grid-cols-2 gap-4'>
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
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
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
                  className='w-[200px] justify-between'
                >
                  {prioridad
                    ? prioridades.find((p) => p.value === prioridad)?.label
                    : 'Seleccionar...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandGroup>
                    {prioridades.map((p) => (
                      <CommandItem
                        key={p.value}
                        onSelect={(
                          currentPrioridad: SetStateAction<string>
                        ) => {
                          setPrioridad(
                            currentPrioridad === prioridad
                              ? ''
                              : currentPrioridad
                          );
                          setOpenPrioridad(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            prioridad === p.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {p.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
          <div>
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
                  className='w-[200px] justify-between'
                >
                  {tipo
                    ? tipos.find((p) => p.value === tipo)?.label
                    : 'Seleccionar...'}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-[200px] p-0'>
                <Command>
                  <CommandGroup>
                    {tipos.map((p) => (
                      <CommandItem
                        key={p.value}
                        onSelect={(currentTipo: SetStateAction<string>) => {
                          setTipo(currentTipo === tipo ? '' : currentTipo);
                          setOpenTipo(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            tipo === p.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {p.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className='grid grid-cols-2 items-center gap-4'>
          {/* Agrega aquí los campos adicionales del formulario */}
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
        <div className='grid grid-cols-1 gap-4'>
          <div className='col-span-1'>
            <label
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
            </p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          type='submit'
          onClick={handleSubmit}
        >
          Crear Solicitud
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
