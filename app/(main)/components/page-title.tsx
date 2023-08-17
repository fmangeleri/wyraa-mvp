'use client';

import { usePathname, useSelectedLayoutSegment } from 'next/navigation';

export function PageTitle() {
  const pathname = useSelectedLayoutSegment();
  let title = 'No title';
  let desc = 'No description';

  switch (pathname) {
    case 'dashboard':
      title = 'Dashboard';
      desc = 'Bienvenido/a a tu panel de control.';
      break;
    case 'solicitudes':
      title = 'Solicitudes';
      desc = 'Controla y gestiona tus solicitudes pendientes.';
      break;
    case 'equipo':
      title = 'Equipo';
      desc = 'Administra los miembros de tu equipo.';
      break;
  }

  return (
    <div>
      <h2 className='text-2xl font-bold tracking-tight'>{title}</h2>
      <p className='text-muted-foreground'>{desc}</p>
    </div>
  );
}
