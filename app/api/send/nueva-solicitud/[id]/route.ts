import { SolicitudNew } from '@/app/(main)/solicitudes/data/types';
import { NewSolicitudTemplate } from '../../../../../components/email-templates/new-solicitud'
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Usuario } from '@/app/(main)/equipo/data/types';

const resend = new Resend('re_L1mHNEDw_AtP6ah28gjYqACP3k2VA88Uu ');

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const req = await request.json()
  const solicitud: SolicitudNew = req.solicitud
  const user: Usuario = req.user
  const id: string = params.id

  try {
    const data = await resend.emails.send({
      from: 'Wyraa <onboarding@resend.dev>',
      to: [user.email],
      subject: `Nueva Solicitud #${id}`,
      react: NewSolicitudTemplate({ solicitud, user, id }),
      text: ''
    });

    console.log(data)
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
