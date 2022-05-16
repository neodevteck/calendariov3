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
  } = useContext(GlobalContext);

  const { setMostrarModalDia } = useContext(GlobalContext);
  function claseDiaActual() {
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

  return (
    <div
      className='border border-gray-200 flex flex-col'
      onClick={() => setMostrarModalDia(true)}
    >
      <header className='flex flex-col items-center'>
        {/* {indice === 0 && (
          <p className='text-sm mt-1'>{dia} </p>
        )} */}
        <p className={`text-sm p-1 my-1 text-center  ${claseDiaActual()}`}>
          {dia.format('DD')}
        </p>
      </header>
      <div
        className='flex-1 cursor-pointer'
        onClick={() => {
          setDiaSeleccionado(dia);
        }}
      >
        {actividades.map((act, idx) => (
          <div
            className={`${ObtenerClaseColor(
              act
            )} text-gray-600 text-sm rounded truncate p-0 m-0`}
            key={idx}
            onClick={() => (
              (window.location.href = `../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID=${act.FLUJOTRABAJOID}`),
              '_blank'
            )}
          >
            <div
              className={`h-3 w-3 ${ObtenerColorUsuario(
                act
              )} rounded-full inline-block`}
            ></div>
            <span>
              {act.ASUNTO}
              {/* {act.FLUJOTRABAJOID.toLocaleString()}  */}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dia;
