'use client';

import { getDoc, doc, collection } from 'firebase/firestore';
import { CreditCard, LogOut, PlusCircle, Settings, User } from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';

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

import { db, auth } from '../db/firebase';
import { Usuario } from '../(main)/equipo/data/types';
import UserProvider, { useUserContext } from '../(main)/contexts/userProvider';
// import { UserNavContent } from './userNavContent';

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

export async function UserNav() {
  const { user, loading, userId, usuario } = useUserContext();
  const router = useRouter();
  // const [user, loading] = useAuthState(auth);
  if (loading) return <h1>Loading</h1>;
  if (!user) router.push('/login');

  // const userId: string = user?.uid as string;
  // const usuario = await getData(userId);

  const inicial1 = usuario.nombre.charAt(0).toUpperCase();
  const inicial2 = usuario.apellido.charAt(0).toUpperCase();
  const iniciales = inicial1 + inicial2;

  return (
    // <UserProvider>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='relative h-8 w-8 rounded-full'
        >
          <Avatar className='h-9 w-9'>
            {/* <AvatarImage
              src='/avatars/03.png'
              alt='@shadcn'
            /> */}
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
            <p className='text-sm font-medium leading-none'>{usuario.nombre}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {usuario.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
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
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // </UserProvider>
  );
}
