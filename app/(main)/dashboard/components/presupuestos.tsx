import { Progress } from '@/components/ui/progress';

export function Presupuestos() {
  return (
    <div className='space-y-8'>
      <div className='flex items-end'>
        <div className='flex-grow flex-shrink-0 ml-4 mr-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Marketing</p>
          <Progress value={33} />
        </div>
        <div className='ml-auto text-sm text-gray-600'>200.000</div>
      </div>
      <div className='flex items-end'>
        <div className='flex-grow flex-shrink-0 ml-4 mr-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Producto</p>
          <Progress value={80} />
        </div>
        <div className='ml-auto text-sm text-gray-600'>600.000</div>
      </div>
      <div className='flex items-end'>
        <div className='flex-grow flex-shrink-0 ml-4 mr-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Ventas</p>
          <Progress value={20} />
        </div>
        <div className='ml-auto text-sm text-gray-600'>100.000</div>
      </div>
      <div className='flex items-end'>
        <div className='flex-grow flex-shrink-0 ml-4 mr-4 space-y-1'>
          <p className='text-sm font-medium leading-none'>Logistica</p>
          <Progress value={67} />
        </div>
        <div className='ml-auto text-sm text-gray-600'>500.000</div>
      </div>
    </div>
  );
}
