import { db } from '@/app/db/firebase';
import { Estados, Firma, Solicitud, SolicitudReq } from '../data/types';
import { MessageSquare } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';

import { collection, getDoc, doc } from 'firebase/firestore';
import { StateButton } from './components/stateButton';
import { Badge } from '@/components/ui/badge';
import { Invoice } from './components/invoice';
import BackArrow from './components/backArrow';
import { SolicitudData } from './solicitudData';
import { FacturaData } from './facturaData';
import SolicitudProvider from './context/solicitudProvider';
import { ExpandFactura } from './expandFactura';
import {
  transformFactura,
  transformFirmas,
  transformImputacion,
} from './context/functions';

export const dynamic = 'force-dynamic';

async function getData(id: string): Promise<Solicitud> {
  try {
    const ref = collection(db, 'solicitudes');
    const data = await getDoc(doc(ref, id));
    const { firmas, factura, imputaciones, ...rest } =
      data.data() as SolicitudReq;
    const firmasFiltered = firmas ? await transformFirmas(firmas) : [];
    const facturaFiltered = factura ? transformFactura(factura) : null;

    const imputacionesFiltered = imputaciones?.data
      ? await transformImputacion(imputaciones.data)
      : null;

    const docAll: Solicitud = {
      ...rest,
      factura: facturaFiltered,
      imputaciones: {
        data: imputacionesFiltered,
        id: imputaciones?.id,
      },
      id: data.id,
      firmas: firmasFiltered,
    } as Solicitud;
    return docAll;
  } catch (err) {
    console.error(err);
    return {} as Solicitud;
  }
}

export default async function Page({ params }: any) {
  // const router = useRouter();

  const { id } = params;

  // const [user, loading] = useAuthState(auth);
  // const userId: string = (user?.uid as string) || '';

  const solicitud: Solicitud = await getData(id as string);

  // const closeSolCard = () => {
  //   router.back();
  // };

  return (
    <>
      <div className='grid grid-cols-4 gap-6 mx-6'>
        <div className='col-span-3 relative'>
          <div className='mx-auto mb-4'>
            <BackArrow />
            <div className='my-4'>
              <h2 className='text-2xl font-bold tracking-tight'>
                Solicitud{' '}
                <Badge
                  // variant='green'
                  className='align-middle'
                >
                  {solicitud.estado}
                </Badge>
              </h2>
              <p className='text-muted-foreground'>#{solicitud.id}</p>
            </div>
          </div>
          <SolicitudProvider>
            <SolicitudData solicitud={solicitud} />
            <FacturaData />
            <ExpandFactura />
          </SolicitudProvider>
        </div>
        <div className='col-span-1 pt-4'>
          {/* <div> */}
          <ScrollArea className='h-1/2 p-2'>
            <ol className='relative border-l-2 border-green dark:border-gray-700 dark:text-gray-400 ml-4'>
              {solicitud.firmas &&
                solicitud.firmas?.map((f: Firma, index: any) => (
                  <li
                    className='mb-10 ml-6 flex flex-row'
                    key={index}
                  >
                    <span className='absolute flex items-center justify-center w-4 h-4 bg-green rounded-full -left-2 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700'></span>
                    <div>
                      <h3 className='font-medium leading-tight text-gray-600'>
                        {f.estado.charAt(0).toUpperCase() + f.estado.slice(1)}
                      </h3>
                      <p className='text-sm text-gray-400'>
                        {f.user.nombre} {f.user.apellido}
                      </p>
                      <p className='text-xs text-gray-400'>{f.fecha}</p>
                    </div>

                    {f.comentario !== '' && (
                      <div className='flex items-center ml-3'>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <MessageSquare />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{f.comentario}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    )}
                  </li>
                ))}
            </ol>
          </ScrollArea>
          {/* </div> */}
          <div className='my-4 h-fit'>
            <Invoice id={id} />
          </div>
          <div className='sticky bottom-0'>
            {solicitud?.firmas && solicitud.firmas.at(-1)?.estado && (
              <StateButton
                estado={solicitud.firmas.at(-1)?.estado as keyof typeof Estados}
                id={id}
                // userId={userId}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
