import React, { useContext,useState,useEffect } from 'react';
import dayjs from 'dayjs';
import {timeConvert } from '../util/util'
//import useStore from '../store/useStore';

import GlobalContext from '../context/GlobalContext';
const Dia = ({ dia,actividades, indice }) => {
  console.log(actividades)
  const [dayEvents, setDayEvents] = useState([]);
  const {
    //filtrarActividades,
    usuarios,   
    idUsuarioLogueado,
    colores,
    setDiaSeleccionado
  } = useContext(GlobalContext);

  const { setMostrarModalDia } = useContext(GlobalContext);
  // function claseDiaActual() {
  //   return dia.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
  //     ? 'bg-blue-600 text-white rounded-full w-7'
  //     : '';
  // }

  // function ObtenerClaseColor(evt) {
  //   let claseColor = 'colorAzul';
  //   if (evt.ESTADO === 3) {
  //     claseColor = 'colorVerde';
  //   } else if (
  //     evt.USUARIOSID != idUsuarioLogueado &&
  //     evt.ESTADO_FLUJOTRABAJO === 1
  //   ) {
  //     claseColor = 'colorAzulClaro';
  //   } else if (
  //     evt.USUARIOSID === idUsuarioLogueado &&
  //     evt.ESTADO === 1
  //   ) {
  //     claseColor = 'colorAzul';
  //   }
  //   return claseColor;
  // }

  // function ObtenerColorUsuario(evt) {
  //   //console.log(evt.TERCERECURSOCTROLID_FLUJOTRABAJO);
  //   for (let i = 0; i < usuarios.length; i++) {
  //     if (
  //       usuarios[i].id === evt.TERCERECURSOCTROLID ||
  //       usuarios[i].id === evt.TERCERECURSOCTROL2ID ||
  //       usuarios[i].id === evt.TERCERECURSOCTROL3ID ||
  //       usuarios[i].id === evt.TERCERECURSOCTROL4ID
  //     ) {
  //       return 'bg-' + colores[usuarios[i].num];
  //     }
  //   }
  //   return '';
  // }

  return (
    <div
      className='border border-gray-200 flex flex-col'
      onClick={() => setMostrarModalDia(true)}
    >
      <header className='flex flex-col items-center'>
        {/* {indice === 0 && (
          <p className='text-sm mt-1'>{dia} </p>
        )} */}
        <p >
          { dia }
        </p>
      </header>
      <div
        className='flex-1 cursor-pointer'
        onClick={() => {
          setDiaSeleccionado(dia);
        }}
      >
        {actividades.map((act, idx) =>
       
          (
          <div
          className='truncate ...'
            key={idx}
            // onClick={() => (window.open('../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID='+ evt.FLUJOTRABAJOID_FLUJOTRABAJO, '_blank'))}
            onClick={() => (
              (window.location.href = `../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID=${act.FLUJOTRABAJOID}`),
              '_blank'
            )}
            
          >            
            {act.FLUJOTRABAJOID.toLocaleString()} -{' '}
            {act.ASUNTO}
          </div>
        )
        )}
      </div>
    </div>
  );
};

export default Dia;
