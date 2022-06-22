import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
const ModalActividad = () => {
  const { setMostrarModalActividad,actividadSeleccionada } = useContext(GlobalContext);
  console.log('Modal dia: '+ actividadSeleccionada);
  return (
    <React.Fragment>
      <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center overflow-scroll'>
        <form className='bg-white rounded-lg shadow-2xl w-2/4'>
          <header className='bg-gray-100 px-8 py-2 flex flex-col items-center'>
            
            <div className='mr-10 text-xl text-gray-500 fond-bold block '>
            {actividadSeleccionada ? actividadSeleccionada.FLUJOTRABAJOID + ' ' : ' '}
              <span 
              className='cursor-pointer'
              onClick={(e) => (
              (window.location.href = `../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID=${actividadSeleccionada.FLUJOTRABAJOID}`),
              '_blank'
            )}
              >
                <i className='fa fa-external-link'></i>
              </span>
             
            </div>
            <div className='mr-10 text-xl text-gray-500 fond-bold block '>
             {actividadSeleccionada ? actividadSeleccionada.NOMACTIV : ''}
            </div>
            <div className='mr-10 text-xl text-gray-500 fond-bold block '>
              {actividadSeleccionada ? actividadSeleccionada.ASUNTO : ''}
            </div>
            <span onClick={() => setMostrarModalActividad(false)}>
              <i className='fa fa-close'></i>
            </span>
          </header>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ModalActividad;
