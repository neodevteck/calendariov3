import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
import ReactTooltip from 'react-tooltip';

const Dia = ({ dia, actividades, indice }) => {
  const {    
    setDiaSeleccionado,
    setActividadSeleccionada,
    ObtenerClaseColor,
    ObtenerColorUsuario,
    ObtenerHora,
    setMostrarModalDia, 
    setMostrarModalActividad,
    setOpcionVista    
  } = useContext(GlobalContext);
  
  function claseDiaActual() {
    return dia.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  } 

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header
        className='flex flex-col items-center cursor-pointer'
        onClick={() => {
          //setMostrarModalDia(true);
          setDiaSeleccionado(dia);
          setOpcionVista(2)
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
          <React.Fragment key={idx}>
          <div
          data-for={act.FLUJOTRABAJOID}
          data-tip={  ` ${ObtenerHora(act)} \n ${act.FLUJOTRABAJOID} \n ${act.NOMTPACTIV}  \n ${act.NOMACTIV} \n ${act.ASUNTO}`  }
            //id={act.FLUJOTRABAJOID}           
            className={`${ObtenerClaseColor(
              act
            )} text-gray-600 text-sm rounded truncate p-0 m-0`}
            key={idx}
            // onClick={() => {
            //   setMostrarModalActividad(true);
            //   setActividadSeleccionada(act);
            // }}
            onClick={(e) => (
              (window.location.href = `../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID=${act.FLUJOTRABAJOID}`),
              '_blank'
              //console.log(act.FLUJOTRABAJOID)
            ) }
          >
            <div
              className={`h-3 w-3 ${ObtenerColorUsuario(
                act
              )} rounded-full inline-block`}
            ></div>
            <span className='text-xs'>{ObtenerHora(act)}</span>
            {/* <span> {act.FLUJOTRABAJOID}</span> */}
            {/* <span> {act.NOMTPACTIV}</span>
            <span> {act.NOMACTIV_FLUJOTRABAJO}</span> */}
            <span></span>
            <span className='text-xs rounded truncate p-0 m-0'>
              {' ' + act.ASUNTO}
            </span>
          </div>      
          <ReactTooltip
                  id={act.FLUJOTRABAJOID}
                  className="extraClass"
                  delayHide={1000}
                  effect="solid"
                  // style={{whiteSpace: preLine}}
                />    
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Dia;
