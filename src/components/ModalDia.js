import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import Spinner from './Spinner';
import Error from './Error';
import useActividades from '../react-query/useActividades';

const ModalDia = ({usuIds}) => {
  //const setMostrarModalDia = useStore((state) => state.setMostrarModalDia);
  const { setMostrarModalDia,diaSeleccionado } = useContext(GlobalContext);

  const { data, status } = useActividades(
    diaSeleccionado,
    diaSeleccionado,
    usuIds,
    2
  );
  
  if (status === 'loading') {
    return <Spinner />;
  } else if (status === 'error') {
    return <Error/>
  }

  return (
    <React.Fragment>
      <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
        <form className='bg-white rounded-lg shadow-2xl w-1/4'>
          <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
            {console.log(data)}
            <span>Modal dia</span>
            <div className='block'>
              {data  ? data.d.Actividades :'' }
            </div>
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
