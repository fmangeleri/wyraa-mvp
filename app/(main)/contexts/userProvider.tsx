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
// import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../db/firebase';
import { User } from 'firebase/auth';
import { Usuario } from '../equipo/data/types';
import { collection, doc, getDoc } from 'firebase/firestore';

interface IUserContext {
  user: User | null | undefined;
  setUser: Dispatch<SetStateAction<User | null | undefined>>;
  // loading: boolean;
  // userId: string;
  // setUserId: Dispatch<SetStateAction<string>>;
  usuario: Usuario | undefined;
  setUsuario: Dispatch<SetStateAction<Usuario | undefined>>;
}

export const UserContext = createContext<IUserContext>({
  user: undefined,
  setUser: (): void => {},
  // loading: true,
  // userId: '',
  // setUserId: (): void => {},
  usuario: undefined,
  setUsuario: (): void => {},
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
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //   } else {
  //   }
  // });

  // const [user, loading] = useAuthState(auth);
  const [user, setUser] = useState<User | null | undefined>();
  // const [userId, setUserId] = useState('');
  const [usuario, setUsuario] = useState<Usuario | undefined>();

  // const userId: string = user?.uid as string;
  // const usuario = await getData(userId);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const auth = await getAuth();
  //     const us = auth.currentUser;
  //     setUser(us);
  //     if (user) {
  //       const userId = user.uid;
  //       const userData = await getData(userId);
  //       setUserId(userId);
  //       setUsuario(userData);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const auth = await getAuth();
        const us = auth.currentUser;
        setUser(us);
        const fetchData = async () => {
          const userId = us?.uid;
          if (userId) {
            const userData = await getData(userId);
            setUsuario(userData);
          }
        };
      };
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        // loading,
        // userId,
        // setUserId,
        usuario,
        setUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
