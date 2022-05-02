import React, { useContext,useState,useEffect } from 'react';
import dayjs from 'dayjs';
import {timeConvert } from '../util/util'
//import useStore from '../store/useStore';

import GlobalContext from '../context/GlobalContext';
const Dia = ({ dia, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    filtrarActividades,
    usuarios,
    actividadesMes,
    idUsuarioLogueado,
    colores,
    setDiaSeleccionado
  } = useContext(GlobalContext);
  useEffect(() => {
    //console.log('filtro')
    //console.log(filtrarActividades)

    // const events =
    // ActividadesMes?
    // ActividadesMes.filter(
    //   (x) =>
    //   {
    //     if (contador < 4) {
    //     if ((x.FECHACALINI_FLUJOTRABAJO != undefined) && (x.FECHACALINI_FLUJOTRABAJO != null) && (x.FECHACALFIN_FLUJOTRABAJO != undefined) && (x.FECHACALFIN_FLUJOTRABAJO != null) && ((dayjs(timeConvert(x.FECHACALINI_FLUJOTRABAJO)).format("DD-MM-YY")  === dia.format("DD-MM-YY")) || (dayjs(timeConvert(x.FECHACALFIN_FLUJOTRABAJO)).format("DD-MM-YY")  === dia.format("DD-MM-YY")))){
    //       contador++
    //       return true
    //      }
    //      if ((x.FECHACALINI2_FLUJOTRABAJO != undefined) && (x.FECHACALINI2_FLUJOTRABAJO != null) && (x.FECHACALFIN2_FLUJOTRABAJO != undefined) && (x.FECHACALFIN2_FLUJOTRABAJO != null) && ((dayjs(timeConvert(x.FECHACALINI2_FLUJOTRABAJO)).format("DD-MM-YY")  === dia.format("DD-MM-YY")) || (dayjs(timeConvert(x.FECHACALFIN2_FLUJOTRABAJO)).format("DD-MM-YY")  === dia.format("DD-MM-YY")))){
    //       contador++
    //       return true
    //      }
    //      if ((x.FECHACALINI3_FLUJOTRABAJO != undefined) && (x.FECHACALINI3_FLUJOTRABAJO != null) && (x.FECHACALFIN3_FLUJOTRABAJO != undefined) && (x.FECHACALFIN3_FLUJOTRABAJO != null) && ((dayjs(timeConvert(x.FECHACALINI3_FLUJOTRABAJO)).format("DD-MM-YY")  === dia.format("DD-MM-YY")) || (dayjs(timeConvert(x.FECHACALFIN3_FLUJOTRABAJO)).format("DD-MM-YY")  === dia.format("DD-MM-YY")))){
    //       contador++
    //       return true
    //      }
    //      if ((x.FECHACALINI4_FLUJOTRABAJO != undefined) && (x.FECHACALINI4_FLUJOTRABAJO != null) && (x.FECHACALFIN4_FLUJOTRABAJO != undefined) && (x.FECHACALFIN4_FLUJOTRABAJO != null) && ((dayjs(timeConvert(x.FECHACALINI4_FLUJOTRABAJO)).format("DD-MM-YY")  === dia.format("DD-MM-YY")) || (dayjs(timeConvert(x.FECHACALFIN4_FLUJOTRABAJO)).format("DD-MM-YY")  === dia.format("DD-MM-YY")))){
    //       contador++
    //       return true
    //      }}

    //      return false
    //   },contador = 0
    // ):[]
    let events = [];
    let contador = 0;    
      for (let i = 0; i < filtrarActividades.length; i++) {
        if (
          filtrarActividades[i].FECHACALINI != undefined &&
          filtrarActividades[i].FECHACALINI != null &&
          filtrarActividades[i].FECHACALFIN != undefined &&
          filtrarActividades[i].FECHACALFIN != null &&
          (dayjs(
            timeConvert(filtrarActividades[i].FECHACALINI)
          ).format('DD-MM-YY') === dia.format('DD-MM-YY') ||
            dayjs(
              timeConvert(filtrarActividades[i].FECHACALFIN)
            ).format('DD-MM-YY') === dia.format('DD-MM-YY'))
        ) {
          events.push(filtrarActividades[i]);
          contador++;
          //return true
        }
        if (
          filtrarActividades[i].FECHACALINI2 != undefined &&
          filtrarActividades[i].FECHACALINI2 != null &&
          filtrarActividades[i].FECHACALFIN2 != undefined &&
          filtrarActividades[i].FECHACALFIN2 != null &&
          (dayjs(
            timeConvert(filtrarActividades[i].FECHACALINI2)
          ).format('DD-MM-YY') === dia.format('DD-MM-YY') ||
            dayjs(
              timeConvert(filtrarActividades[i].FECHACALFIN2)
            ).format('DD-MM-YY') === dia.format('DD-MM-YY'))
        ) {
          events.push(filtrarActividades[i]);
          contador++;
          //return true
        }
        if (
          filtrarActividades[i].FECHACALINI3 != undefined &&
          filtrarActividades[i].FECHACALINI3 != null &&
          filtrarActividades[i].FECHACALFIN3 != undefined &&
          filtrarActividades[i].FECHACALFIN3 != null &&
          (dayjs(
            timeConvert(filtrarActividades[i].FECHACALINI3)
          ).format('DD-MM-YY') === dia.format('DD-MM-YY') ||
            dayjs(
              timeConvert(filtrarActividades[i].FECHACALFIN3)
            ).format('DD-MM-YY') === dia.format('DD-MM-YY'))
        ) {
          events.push(filtrarActividades[i]);
          contador++;
          //return true
        }
        if (
          filtrarActividades[i].FECHACALINI4 != undefined &&
          filtrarActividades[i].FECHACALINI4 != null &&
          filtrarActividades[i].FECHACALFIN4 != undefined &&
          filtrarActividades[i].FECHACALFIN4 != null &&
          (dayjs(
            timeConvert(filtrarActividades[i].FECHACALINI4)
          ).format('DD-MM-YY') === dia.format('DD-MM-YY') ||
            dayjs(
              timeConvert(filtrarActividades[i].FECHACALFIN4)
            ).format('DD-MM-YY') === dia.format('DD-MM-YY'))
        ) {
          events.push(filtrarActividades[i]);
          contador++;
          //return true
        }
        if (contador > 3) {
          break;
        }
      }
    //(contador)
    //console.log(events)
    setDayEvents(events);
  }, [actividadesMes, dia,filtrarActividades]);

  //const setMostrarModalDia = useStore((state) => state.setMostrarModalDia);
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
    } else if (
      evt.USUARIOSID === idUsuarioLogueado &&
      evt.ESTADO === 1
    ) {
      claseColor = 'colorAzul';
    }
    return claseColor;
  }

  function ObtenerColorUsuario(evt) {
    //console.log(evt.TERCERECURSOCTROLID_FLUJOTRABAJO);
    for (let i = 0; i < usuarios.length; i++) {
      if (
        usuarios[i].id === evt.TERCERECURSOCTROLID ||
        usuarios[i].id === evt.TERCERECURSOCTROL2ID ||
        usuarios[i].id === evt.TERCERECURSOCTROL3ID ||
        usuarios[i].id === evt.TERCERECURSOCTROL4ID
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
        {rowIdx === 0 && (
          <p className='text-sm mt-1'>{dia.format('ddd').toUpperCase()} </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${claseDiaActual()}`}>
          {dia.format('DD')}
        </p>
      </header>
      <div
        className='flex-1 cursor-pointer'
        onClick={() => {
          setDiaSeleccionado(dia);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            // onClick={() => (window.open('../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID='+ evt.FLUJOTRABAJOID_FLUJOTRABAJO, '_blank'))}
            onClick={() => (
              (window.location.href = `../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID=${evt.FLUJOTRABAJOID}`),
              '_blank'
            )}
            className={`${ObtenerClaseColor(
              evt
            )} p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            <div
              className={`h-3 w-3 ${ObtenerColorUsuario(
                evt
              )} rounded-full inline-block`}
            ></div>
            {evt.FLUJOTRABAJOID.toLocaleString()} -{' '}
            {evt.ASUNTO}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dia;
