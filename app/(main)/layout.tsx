import { SideBar } from './components/sideBar';

import { IncomingMessage } from 'http';
import { LayoutHead } from './components/layout-head';
import { AuthCheck } from './components/authCheck';

// async function getData(): Promise<any> {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   if (user) {
//     const ref = collection(db, 'usuarios');
//     try {
//       const u = await getDoc(doc(ref, user.uid));
//       const usuario = u.data();
//       const inicial1 = usuario?.nombre.charAt(0).toUpperCase();
//       const inicial2 = usuario?.apellido.charAt(0).toUpperCase();
//       const iniciales = inicial1 + inicial2;
//       console.log(user);
//       console.log(usuario);
//       console.log(iniciales);
//       return { user, usuario, iniciales };
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     redirect('/login');
//   }
// }

export default async function Layout({
  children,
  req,
}: {
  children: React.ReactNode;
  req: IncomingMessage;
}) {
  // const data = await getData();

  return (
    <div className='grid lg:grid-cols-6'>
      <SideBar />
      <div className='col-span-5 border-l'>
        <div className='container mx-auto py-10'>
          <AuthCheck />
          <LayoutHead />
          {children}
        </div>
      </div>
    </div>
  );
}
