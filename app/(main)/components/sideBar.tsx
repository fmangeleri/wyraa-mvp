'use client';

import React, { useState } from 'react';

import {
  LayoutGrid,
  User,
  CreditCard,
  ArrowLeftRight,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function SideBar() {
  const [activeButton, setActiveButton] = useState<string>('');

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className='pb-12 hidden lg:block col-span-1'>
      {/* <div className='fixed top-0 left-0 '> */}
      <div className='space-y-4 py-4'>
        <div className='px-4 py-2'>
          <h2 className='mb-2 px-2 text-lg font-semibold tracking-tight'>
            Wyraa
          </h2>
          <div className='space-y-1'>
            <Link
              href='/dashboard'
              prefetch={false}
            >
              <Button
                variant={activeButton === 'dashboard' ? 'secondary' : 'ghost'}
                size='sm'
                className='w-full justify-start'
                onClick={() => handleButtonClick('dashboard')}
              >
                <LayoutGrid className='mr-2 h-4 w-4' />
                Dashboard
              </Button>
            </Link>
            <Link
              href='/solicitudes'
              prefetch={false}
            >
              <Button
                variant={activeButton === 'solicitudes' ? 'secondary' : 'ghost'}
                size='sm'
                className='w-full justify-start'
                onClick={() => handleButtonClick('solicitudes')}
              >
                <ClipboardList className='mr-2 h-4 w-4' />
                Solicitudes
              </Button>
            </Link>
            {/* <Link href='/tarjetas'> */}
            <Button
              variant={activeButton === 'tarjetas' ? 'secondary' : 'ghost'}
              size='sm'
              className='w-full justify-start'
              onClick={() => handleButtonClick('tarjetas')}
            >
              <CreditCard className='mr-2 h-4 w-4' />
              Tarjetas
            </Button>
            {/* </Link> */}
            {/* <Link href='/movimientos'> */}
            <Button
              variant={activeButton === 'movimientos' ? 'secondary' : 'ghost'}
              size='sm'
              className='w-full justify-start'
              onClick={() => handleButtonClick('movimientos')}
            >
              <ArrowLeftRight className='mr-2 h-4 w-4' />
              Movimientos
            </Button>
            {/* </Link> */}
            <Link href='/equipo'>
              <Button
                variant={activeButton === 'equipo' ? 'secondary' : 'ghost'}
                size='sm'
                className='w-full justify-start'
                onClick={() => handleButtonClick('equipo')}
              >
                <User className='mr-2 h-4 w-4' />
                Equipo
              </Button>
            </Link>
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
