import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

const ModalDia = () => {
  //const setMostrarModalDia = useStore((state) => state.setMostrarModalDia);
  const { setMostrarModalDia,diaSeleccionado } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <form className='bg-white rounded-lg shadow-2xl w-1/4'>
          <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
            {console.log(diaSeleccionado)}
            <span>Modal dia</span>
            <span onClick={() => setMostrarModalDia(false)}>
              <i className='fa fa-close'></i>
            </span>
          </header>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ModalDia;
