export function General() {
  return (
    <div className='p-4'>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <div className='flex items-center mb-2'>
            <div className='w-4 h-4 bg-lime-400 rounded-full mr-2'></div>
            <div className='flex flex-col items-start mb-2'>
              <div className='text-gray-400'>Presupuesto</div>
              <div className='text-gray-600 text-sm ml-2'>1.000.000</div>
            </div>
          </div>
          <div className='flex items-center mb-2'>
            <div className='w-4 h-4 bg-teal-700 rounded-full mr-2'></div>
            <div className='flex flex-col items-start mb-2'>
              <div className='text-gray-400'>Ejecutado</div>
              <div className='text-gray-600 text-sm ml-2'>300.000</div>
            </div>
          </div>
          <div className='flex items-center'>
            <div className='w-4 h-4 bg-sky-100 rounded-full mr-2'></div>
            <div className='flex flex-col items-start mb-2'>
              <div className='text-gray-400'>Solicitado</div>
              <div className='text-gray-600 text-sm ml-2'>250.000</div>
            </div>
          </div>
        </div>
        <div>{/* <PieChart /> */}</div>
      </div>
    </div>
  );
}
