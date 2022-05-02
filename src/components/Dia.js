import React, { useContext } from 'react';
import dayjs from 'dayjs';
//import useStore from '../store/useStore';

import GlobalContext from '../context/GlobalContext';

const Dia = ({ dia, rowIdx }) => {
  //const setMostrarModalDia = useStore((state) => state.setMostrarModalDia);
  const { setMostrarModalDia } = useContext(GlobalContext);
  function claseDiaActual() {
    return dia.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }

  return (
    <div
      className='border border-gray-200 flex flex-col'
      onClick={() => setMostrarModalDia(true)}
    >
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
