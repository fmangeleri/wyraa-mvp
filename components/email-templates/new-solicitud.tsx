import { Usuario } from '@/app/(main)/equipo/data/types';
import { formatFecha } from '@/app/(main)/solicitudes/[id]/context/functions';
import { SolicitudNew } from '@/app/(main)/solicitudes/data/types';
import * as React from 'react';

interface EmailTemplateProps {
  solicitud: SolicitudNew;
  user: Usuario;
  id: string;
}

export const NewSolicitudTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  solicitud,
  user,
  id,
}) => (
  <div className='max-w-md mx-auto p-4 bg-white shadow-md rounded-md'>
    <h1 className='text-2xl font-semibold mb-4'>
      Solicitud de {solicitud.tipo}
    </h1>
    <p>
      <strong>Área:</strong> {solicitud.area}
    </p>
    <p>
      <strong>Estado:</strong> {solicitud.estado}
    </p>
    <p>
      <strong>Monto:</strong> {solicitud.monto}
    </p>
    <p>
      <strong>Prioridad:</strong> {solicitud.prioridad}
    </p>
    <p>
      <strong>En Presupuesto:</strong> {solicitud.enPresupuesto}
    </p>
    <p>
      <strong>Proveedor:</strong> {solicitud.proveedor}
    </p>
    <p>
      <strong>Tema:</strong> {solicitud.tema}
    </p>
    <p>
      <strong>Subtema:</strong> {solicitud.subtema}
    </p>
    <p>
      <strong>Tipo:</strong> {solicitud.tipo}
    </p>
    <p>
      <strong>Solicitante:</strong> {user.nombre + ' ' + user.apellido}
    </p>
    <p>
      <strong>Email:</strong> {user.email}
    </p>

    {solicitud.factura && (
      <div>
        <h2 className='text-xl font-semibold mt-4'>Factura</h2>
        <p>
          <strong>Nro:</strong> {solicitud.factura.nro ?? ''}
        </p>
        <p>
          <strong>Fecha de Emisión:</strong>{' '}
          {solicitud.factura.fechaEmision
            ? formatFecha(solicitud.factura.fechaEmision)
            : ''}
        </p>
        <p>
          <strong>Fecha de Vencimiento:</strong>{' '}
          {solicitud.factura.fechaVencimiento
            ? formatFecha(solicitud.factura.fechaVencimiento)
            : ''}
        </p>
        <p>
          <strong>Proveedor:</strong> {solicitud.factura.proveedor ?? ''}
        </p>
        <p>
          <strong>Dirección del Proveedor:</strong>{' '}
          {solicitud.factura.direccionProveedor ?? ''}
        </p>
        <p>
          <strong>CUIT:</strong> {solicitud.factura.cuit ?? ''}
        </p>
      </div>
    )}

    <a
      href={`demo.wyraa.com/solicitudes/${id}`}
      className='mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md'
    >
      Ir a la Solicitud
    </a>

    {/* <footer className='mt-4 text-center text-gray-500'>
      &copy; {new Date().getFullYear()} Nombre de tu Empresa
    </footer> */}
  </div>
);
