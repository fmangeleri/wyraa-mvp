import { Metadata } from 'next';
import {
  Activity,
  CreditCard,
  DollarSign,
  Download,
  Users,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Overview } from './components/overview';
import { Solicitudes } from './components/solicitudes';
import { Presupuestos } from './components/presupuestos';
import { General } from './components/general';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app using the components.',
};

export default function DashboardPage() {
  return (
    <>
      <div className='hidden flex-col md:flex'>
        <div className='flex-1 space-y-4 pt-6'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='md:col-span-1 lg:col-span-2 grid gap-4'>
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <Overview />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className='flex items-center justify-between'>
                    <CardTitle>Solicitudes Recientes</CardTitle>
                    {/* <CardDescription></CardDescription> */}
                    <Link href='/solicitudes'>
                      <p className='text-blue-500 text-md'>Ver todos</p>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <Solicitudes />
                </CardContent>
              </Card>
            </div>
            <div className='col-span-1 flex flex-col gap-4'>
              <Card>
                <CardHeader>
                  <CardTitle>General</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <General />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Presupuestos</CardTitle>
                  <CardDescription>Montos restantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Presupuestos />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
