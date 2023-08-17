'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../db/firebase';
import { User } from 'firebase/auth';
import { Usuario } from '../equipo/data/types';
import { collection, doc, getDoc } from 'firebase/firestore';

interface IUserContext {
  user: User | null | undefined;
  loading: boolean;
  userId: string;
  // setUserId: Dispatch<SetStateAction<string>>;
  usuario: Usuario;
  // setUsuario: Dispatch<SetStateAction<Usuario>>;
}

export const UserContext = createContext<IUserContext>({
  user: undefined,
  loading: true,
  userId: '',
  // setUserId: (): void => {},
  usuario: {} as Usuario,
  // setUsuario: (): void => {},
});

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

export default async function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, loading] = useAuthState(auth);
  const [userId, setUserId] = useState('');
  const [usuario, setUsuario] = useState({} as Usuario);

  // const userId: string = user?.uid as string;
  // const usuario = await getData(userId);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userId = user.uid;
        const userData = await getData(userId);
        setUserId(userId);
        setUsuario(userData);
      }
    };

    fetchData();
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        userId,
        // setUserId,
        usuario,
        // setUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
