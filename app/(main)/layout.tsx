import { SideBar } from '../components/sideBar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid lg:grid-cols-6'>
      <SideBar />
      {children}
    </div>
  );
}
