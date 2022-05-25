import React, { useContext, useState } from 'react';
import dayjs from 'dayjs';

import GlobalContext from '../context/GlobalContext';

const Dia = ({ dia, actividades, indice }) => {
  //console.log(actividades)
  const {
    //filtrarActividades,
    usuarios,
    idUsuarioLogueado,
    colores,
    setDiaSeleccionado,
    setActividadSeleccionada
  } = useContext(GlobalContext);

  const { setMostrarModalDia,setMostrarModalActividad } = useContext(GlobalContext);
  function claseDiaActual() {
    // console.log(dia.format('DD-MM-YY'));
    // console.log(dayjs().format('DD-MM-YY'));

    return dia.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  }
  function ObtenerClaseColor(evt) {
    let claseColor = 'colorAzul';
    if (evt.ESTADO === 3) {
      claseColor = 'colorVerde';
    } else if (
      evt.USUARIOSID != idUsuarioLogueado &&
      evt.ESTADO_FLUJOTRABAJO === 1
    ) {
      claseColor = 'colorAzulClaro';
    } else if (evt.USUARIOSID === idUsuarioLogueado && evt.ESTADO === 1) {
      claseColor = 'colorAzul';
    }
    return claseColor;
  }

  function ObtenerColorUsuario(evt) {
    //console.log(evt.TERCERECURSOCTROLID_FLUJOTRABAJO);
    for (let i = 0; i < usuarios.length; i++) {
      if (
        usuarios[i].id == evt.TERCERECURSOCTROLID ||
        usuarios[i].id == evt.TERCERECURSOCTROL2ID ||
        usuarios[i].id == evt.TERCERECURSOCTROL3ID ||
        usuarios[i].id == evt.TERCERECURSOCTROL4ID
      ) {
        return 'bg-' + colores[usuarios[i].num];
      }
    }
    return '';
  }

  function ObtenerHora(evt) {
    //console.log(evt.TERCERECURSOCTROLID_FLUJOTRABAJO);
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id == evt.TERCERECURSOCTROLID && evt.HORACALINI !== '' && evt.HORACALFIN !== '00:00') {
        return evt.HORACALINI + '-' + evt.HORACALFIN;
      }
      if (
        usuarios[i].id == evt.TERCERECURSOCTROL2ID && evt.HORACALINI2 !== '' && evt.HORACALFIN2 !== '00:00'
      ) {
        return evt.HORACALINI2 + '-' + evt.HORACALFIN2;
      }
      if (
        usuarios[i].id == evt.TERCERECURSOCTROL3ID && evt.HORACALINI3 !== '' && evt.HORACALFIN3 !== '00:00'
      ) {
        return evt.HORACALINI3 + '-' + evt.HORACALFIN3;
      }
      if (
        usuarios[i].id == evt.TERCERECURSOCTROL4ID && evt.HORACALINI4 !== '' && evt.HORACALFIN4 !== '00:00'
      ) {
        return evt.HORACALINI4 + '-' + evt.HORACALFIN4;
      }
    }
    return '';
  }

  return (
    <div
      className='border border-gray-200 flex flex-col'
    >
      <header className='flex flex-col items-center'  onClick={() => {setMostrarModalDia(true);setDiaSeleccionado(dia)}}>
        {/* {indice === 0 && (
          <p className='text-sm mt-1'>{dia} </p>
        )} */}
        <p className={`text-sm p-1 my-1 text-center  ${claseDiaActual()}`}>
          {dia.format('DD')}
        </p>
      </header>
      <div
        className='flex-1 cursor-pointer'
       
      >
        {actividades.map((act, idx) => (
          <div
            className={`${ObtenerClaseColor(
              act
            )} text-gray-600 text-sm rounded truncate p-0 m-0`}
            key={idx}
            onClick={() => {setMostrarModalActividad(true); setActividadSeleccionada(act)} }
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
             <span className='text-xs'>
            {ObtenerHora(act)}
            </span>
            <span  className='text-xs rounded truncate p-0 m-0'>
              {' ' + act.ASUNTO}
              {/* {act.FLUJOTRABAJOID.toLocaleString()}  */}
            </span>          
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dia;
