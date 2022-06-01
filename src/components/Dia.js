import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';

import GlobalContext from '../context/GlobalContext';

const Dia = ({ dia, actividades, indice }) => {
  const {    
    setDiaSeleccionado,
    setActividadSeleccionada,
    ObtenerClaseColor,
    ObtenerColorUsuario,
    ObtenerHora,
    setMostrarModalDia, setMostrarModalActividad
    
  } = useContext(GlobalContext);

  
  function claseDiaActual() {
    return dia.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }
  

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header
        className='flex flex-col items-center'
        onClick={() => {
          setMostrarModalDia(true);
          setDiaSeleccionado(dia);
        }}
      >
        {indice <= 6 && (
          <p className='text-sm mt-1'>{dia.format('ddd').toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${claseDiaActual()}`}>
          {dia.format('DD')}
        </p>
      </header>
      <div className='flex-1 cursor-pointer'>
        {actividades.map((act, idx) => (
          <div
            className={`${ObtenerClaseColor(
              act
            )} text-gray-600 text-sm rounded truncate p-0 m-0`}
            key={idx}
            onClick={() => {
              setMostrarModalActividad(true);
              setActividadSeleccionada(act);
            }}
            // onClick={(e) => (
            //   // (window.location.href = `../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID=${act.FLUJOTRABAJOID}`),
            //   // '_blank'
            //   console.log(act.FLUJOTRABAJOID)
            // )}
          >
            <div
              className={`h-3 w-3 ${ObtenerColorUsuario(
                act
              )} rounded-full inline-block`}
            ></div>
            <span className='text-xs'>{ObtenerHora(act)}</span>
            <span className='text-xs rounded truncate p-0 m-0'>
              {' ' + act.ASUNTO}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dia;
