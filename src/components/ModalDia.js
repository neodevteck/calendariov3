import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import Spinner from './Spinner';
import Error from './Error';
import useActividades from '../react-query/useActividades';

const ModalDia = ({ usuIds }) => {
  const { setMostrarModalDia, diaSeleccionado,actividadSeleccionada,ObtenerColorUsuario } = useContext(GlobalContext);

  const { data, status } = useActividades(
    diaSeleccionado,
    diaSeleccionado,
    usuIds,
    3
  );

  if (status === 'loading') {
    //return <Spinner />;
    return (
      <React.Fragment>
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
          <form className='bg-white rounded-lg shadow-2xl w-3/4'>
            <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
            <Spinner />;
            </header>          
          </form>
        </div>
      </React.Fragment>)
  } else if (status === 'error') {
    return <Error />;
  }

  return (
    <React.Fragment>
      <div className=' w-full fixed left-0 top-5 bottom- flex justify-center items-center '>
        <form className='bg-white rounded-lg shadow-2xl w-3/4'>
          <header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
            {console.log(data)}
            {console.log(
              data.d[0].Actividades ? JSON.parse(data.d[0].Actividades) : 'nada'
            )}
            

            <span onClick={() => setMostrarModalDia(false)}>
              <i className='fa fa-close'></i>
            </span>
            <span className='text-center'>{data.d[0].Fecha}</span>
          </header>
          <div class='sm:h-[calc(100%-3rem)] max-w-lg my-6 mx-auto relative w-auto pointer-events-none'>
            <div class='h-80 overflow-auto border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current'>
              <div class='flex flex-shrink-0 flex-wrap items-center justify-end p-4 '>
                {data.d[0].Actividades ? (
                  JSON.parse(data.d[0].Actividades).map((x) => {
                    return (
                      <React.Fragment key={x.FLUJOTRABAJOID}>
                        <div className='block text-center  border-t border-gray-200 rounded-b-md'>
                          {x.ASUNTO}
                        </div>
                        <div className='mr-10 text-xl text-gray-500 fond-bold block '>
            {actividadSeleccionada ? actividadSeleccionada.FLUJOTRABAJOID + ' ' : ' '}
              <span 
              className='cursor-pointer'
              onClick={(e) => (
              (window.location.href = `../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID=${x.FLUJOTRABAJOID}`),
              '_blank'
            )}
              >
                <i className='fa fa-external-link'></i>
              </span>
             
            </div>
            <div
              className={`h-3 w-3 ${ObtenerColorUsuario(
                x
              )} rounded-full inline-block`}
            ></div>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default ModalDia;
