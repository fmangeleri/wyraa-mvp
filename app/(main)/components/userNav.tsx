'use client';

import { getDoc, doc, collection } from 'firebase/firestore';
import { CreditCard, LogOut, PlusCircle, Settings } from 'lucide-react';
import { redirect } from 'next/navigation';
import { User, signOut } from 'firebase/auth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { db, auth } from '@/app/db/firebase';
import { Usuario } from '@/app/(main)/equipo/data/types';
import { useUserContext } from '@/app/(main)/contexts/userProvider';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

async function getData(id: string): Promise<Usuario> {
  const ref = collection(db, 'usuarios');
  try {
    const user = await getDoc(doc(ref, id));
    const userFiltered = user.data();
    return userFiltered as Usuario;
  } catch (error) {
    console.log(error);
    return {} as Usuario;
  }
}

export function UserNav() {
  // const [user, setUser] = useState<User | null>(null);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [iniciales, setIniciales] = useState<string>('AA');
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const userId = user.uid;
        const userData = await getData(userId);
        setUsuario(userData);
        const inicial1 = userData.nombre?.charAt(0).toUpperCase();
        const inicial2 = userData.apellido?.charAt(0).toUpperCase();
        const inis = inicial1 + inicial2;
        setIniciales(inis);
      };
      fetchData().then(() => {
        // console.log(user);
        // console.log(usuario);
        // console.log(iniciales);
      });
      console.log('fetch');
    }
  }, [user]);

  const logOut = () => {
    signOut(auth);
    redirect('/login');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full'
        >
          <Avatar className='h-9 w-9'>
            <AvatarFallback>{iniciales}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount
      >
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              {usuario?.nombre}
            </p>
            <p className='text-xs leading-none text-muted-foreground'>
              {usuario?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuSeparator /> */}
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className='mr-2 h-4 w-4' />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className='mr-2 h-4 w-4' />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='mr-2 h-4 w-4' />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PlusCircle className='mr-2 h-4 w-4' />
            <span>New Team</span>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          <span onClick={logOut}>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
