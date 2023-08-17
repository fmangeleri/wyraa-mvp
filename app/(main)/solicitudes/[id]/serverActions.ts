import { db } from "@/app/db/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { revalidatePath } from "next/cache";

export const onUpdateState = async (
  // solicitud: Solicitud,
  id: string,
  userId: string,
  newEstado: string,
  comentario: string
) => {
  'use server';

  const ref = doc(db, 'solicitudes-prueba', id);
  const solicitudReq = await getDoc(ref);
  if (solicitudReq.exists()) {
    const solicitudOld = await solicitudReq.data();
    const solicitudUpdated = {
      estado: newEstado,
      firmas: [
        ...solicitudOld.firmas,
        {
          estado: newEstado,
          user: doc(db, 'usuarios', userId),
          fecha: new Date(),
          comentario: comentario,
        },
      ],
    };
    try {
      await updateDoc(ref, solicitudUpdated);
    } catch (error) {
      console.log(error);
    }
  }
  revalidatePath('/[id]');
};