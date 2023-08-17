'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Icons } from '@/components/icons';

import { auth, googleProvider, db } from '../../db/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { SetStateAction, useState } from 'react';
import {
  Grupos,
  Roles,
  Ubicaciones,
  UsuarioNew,
} from '@/app/(main)/equipo/data/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [empresa, setEmpresa] = useState('UCEMA');
  const [openRol, setOpenRol] = useState(false);
  const [rol, setRol] = useState<Roles>();
  const [openGrupos, setOpenGrupos] = useState(false);
  const [grupos, setGrupos] = useState<Grupos>();
  const [ubicacion, setUbicacion] = useState<Ubicaciones>();

  const router = useRouter();

  async function setUser(id: string, emailProvider?: string | null) {
    const newUser: UsuarioNew = {
      nombre,
      apellido,
      email: emailProvider ? emailProvider : email,
      empresa,
      rol: rol ? rol : Roles.Solicitante,
      grupos: grupos ? grupos : Grupos.Producto,
      ubicacion: ubicacion ? ubicacion : Ubicaciones.Centro,
    };
    const ref = doc(db, 'usuarios', id);
    await setDoc(ref, newUser);
  }

  const signIn = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setUser(newUser.user.uid);

      router.push('/solicitudes');
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const newUser = await signInWithPopup(auth, googleProvider);
      await setUser(newUser.user.uid, newUser.user.email);
      router.push('/solicitudes');
    } catch (error) {
      console.error(error);
    }
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  async function toStepTwo() {
    setIsRegistering(true);
  }

  return (
    <div
      className={cn('grid gap-6', className)}
      {...props}
    >
      {!isRegistering ? (
        <form onSubmit={onSubmit}>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <div className='grid grid-cols-2 gap-2'>
                <div>
                  <Label
                    // className='sr-only'
                    htmlFor='nombre'
                  >
                    Nombre
                  </Label>
                  <Input
                    id='nombre'
                    placeholder='Lio'
                    type='text'
                    autoCorrect='off'
                    required
                    disabled={isLoading}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </div>
                <div>
                  <Label
                    // className='sr-only'
                    htmlFor='apellido'
                  >
                    Apellido
                  </Label>
                  <Input
                    id='apellido'
                    required
                    placeholder='Messi'
                    type='text'
                    autoCorrect='off'
                    disabled={isLoading}
                    onChange={(e) => setApellido(e.target.value)}
                  />
                </div>
              </div>
              <Label
                // className='sr-only'
                htmlFor='empresa'
              >
                Empresa
              </Label>
              <Input
                id='empresa'
                placeholder='UCEMA'
                type='text'
                autoCorrect='off'
                // disabled={isLoading}
                disabled
                onChange={(e) => setEmpresa(e.target.value)}
              />
              <div className='grid grid-cols-2 gap-2'>
                <div className='flex flex-col my-2 gap-2'>
                  <Label
                    // className='sr-only'
                    htmlFor='grupos'
                  >
                    Grupo
                  </Label>
                  <Popover
                    open={openGrupos}
                    onOpenChange={setOpenGrupos}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openGrupos}
                        className='justify-between'
                      >
                        {grupos
                          ? Grupos[grupos as keyof typeof Grupos]
                          : 'Seleccionar grupo...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandGroup>
                          {Object.keys(Grupos).map((key) => {
                            const value = Grupos[key as keyof typeof Grupos];
                            return (
                              <CommandItem
                                key={value}
                                onSelect={(
                                  currentGrupo: SetStateAction<string>
                                ) => {
                                  setGrupos(
                                    currentGrupo === grupos
                                      ? Grupos.Producto
                                      : value
                                  );
                                  setOpenGrupos(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    grupos === value
                                      ? 'opacity-100'
                                      : 'opacity-0'
                                  )}
                                />
                                {Grupos[key as keyof typeof Grupos]}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className='flex flex-col my-2 gap-2'>
                  <Label htmlFor='rol'>Rol</Label>
                  <Popover
                    open={openRol}
                    onOpenChange={setOpenRol}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        variant='outline'
                        role='combobox'
                        aria-expanded={openRol}
                        className='justify-between'
                      >
                        {rol
                          ? Roles[rol as keyof typeof Roles] // Acceder al label usando el enum
                          : 'Seleccionar rol...'}
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandGroup>
                          {Object.keys(Roles).map((key) => {
                            const value = Roles[key as keyof typeof Roles];
                            return (
                              <CommandItem
                                key={value}
                                onSelect={(
                                  currentRol: SetStateAction<string>
                                ) => {
                                  setRol(
                                    currentRol === rol
                                      ? Roles.Solicitante
                                      : value
                                  );
                                  setOpenRol(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    'mr-2 h-4 w-4',
                                    rol === value ? 'opacity-100' : 'opacity-0'
                                  )}
                                />
                                {Roles[key as keyof typeof Roles]}
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
            <Button
              disabled={isLoading}
              onClick={toStepTwo}
            >
              {isLoading && (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              )}
              Continuar
            </Button>
          </div>
        </form>
      ) : (
        <>
          <form onSubmit={onSubmit}>
            <div className='grid gap-2'>
              <div className='grid gap-1'>
                <Label
                  className='sr-only'
                  htmlFor='email'
                >
                  Email
                </Label>
                <Input
                  id='email'
                  placeholder='name@example.com'
                  type='email'
                  autoCapitalize='none'
                  autoComplete='email'
                  autoCorrect='off'
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Label
                  className='sr-only'
                  htmlFor='password'
                >
                  Pasword
                </Label>
                <Input
                  id='password'
                  placeholder='password'
                  type='password'
                  autoCapitalize='none'
                  autoComplete='password'
                  autoCorrect='off'
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                disabled={isLoading}
                onClick={signIn}
              >
                {isLoading && (
                  <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Or continue with
              </span>
            </div>
          </div>
          <Button
            variant='outline'
            type='button'
            disabled={isLoading}
            onClick={signInWithGoogle}
          >
            {isLoading ? (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
              <Icons.google className='mr-2 h-4 w-4' />
            )}{' '}
            Gmail
          </Button>
        </>
      )}
    </div>
  );
}
