import { SolicitudNew } from '@/app/(main)/solicitudes/data/types';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Usuario } from '@/app/(main)/equipo/data/types';
import { UpdateSolicitudTemplate, reemplazarUltimaLetraConA } from '@/components/email-templates/update-solicitud';

const resend = new Resend('re_L1mHNEDw_AtP6ah28gjYqACP3k2VA88Uu ');

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const req = await request.json()
  const solicitud: SolicitudNew = req.solicitud
  const user: Usuario = req.user
  const emails: string[] = req.emails
  const newEstado = req.newEstado
  const id: string = params.id

  try {
    const data = await resend.emails.send({
      from: 'Wyraa <hola@demo.wyraa.com>',
      to: emails,
      subject: `Solicitud ${reemplazarUltimaLetraConA(newEstado)} #${id}`,
      react: UpdateSolicitudTemplate({ solicitud, user, id, newEstado }),
      text: ''
    });

    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
