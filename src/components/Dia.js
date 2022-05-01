import React from 'react';
import dayjs from 'dayjs';

const Dia = ({ dia, rowIdx }) => {
  function claseDiaActual() {
    return dia.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header className='flex flex-col items-center'>
        {rowIdx === 0 && (
          <p className='text-sm mt-1'>{dia.format('ddd').toUpperCase()} </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${claseDiaActual()}`}>
          {dia.format('DD')}
        </p>
      </header>
    </div>
  );
};

export default Dia;
