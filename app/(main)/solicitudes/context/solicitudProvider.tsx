'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';
import { Solicitud } from '../data/types';

interface ISolicitudContext {
  solicitud: Solicitud;
  setSolicitud: Dispatch<SetStateAction<Solicitud>>;
  showCard: boolean;
  setShowCard: Dispatch<SetStateAction<boolean>>;
  newEstado: string;
  setNewEstado: Dispatch<SetStateAction<string>>;
}

export const SolicitudContext = createContext<ISolicitudContext>({
  solicitud: {} as Solicitud,
  setSolicitud: (): void => {},
  showCard: false,
  setShowCard: (): void => {},
  newEstado: '',
  setNewEstado: (): void => {},
});

export default function SolicitudProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [solicitud, setSolicitud] = useState<Solicitud>({} as Solicitud);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [newEstado, setNewEstado] = useState<string>('');

  return (
    <SolicitudContext.Provider
      value={{
        solicitud,
        setSolicitud,
        showCard,
        setShowCard,
        newEstado,
        setNewEstado,
      }}
    >
      {children}
    </SolicitudContext.Provider>
  );
}

export const useSolicitudContext = () => useContext(SolicitudContext);
