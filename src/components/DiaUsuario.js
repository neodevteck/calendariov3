import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContext';
import { times } from '../util/util';
import * as d3 from "d3";

const DiaUsuario = ({ dia, actividades, indice, idUsuario }) => {
  const {
    setActividadSeleccionada,
    ObtenerClaseColor,
    ObtenerColorUsuario,
    ObtenerHora,
    setMostrarModalDia, setMostrarModalActividad, ObtenerNombreUsuario
  } = useContext(GlobalContext);
  return (
    // <div>        
    //   <div> {ObtenerNombreUsuario(idUsuario)} </div>
    //      {actividades.map((act, idx) => (
    //   <div
    //     className={`${ObtenerClaseColor(
    //       act
    //     )} text-gray-600 text-sm rounded truncate p-0 m-0`}
    //     key={idx}
    //     onClick={() => {
    //       setMostrarModalActividad(true);
    //       setActividadSeleccionada(act);
    //     }}            
    //   >
    //     <div
    //       className={`h-3 w-3 ${ObtenerColorUsuario(
    //         act
    //       )} rounded-full inline-block`}
    //     ></div>
    //     <span className='text-xs'>{ObtenerHora(act)}</span>
    //     <span className='text-xs rounded truncate p-0 m-0'>
    //       {' ' + act.ASUNTO}
    //     </span>
    //   </div>
    // ))}
    // </div>
    <div>
      <div> {ObtenerNombreUsuario(idUsuario)} </div>
      {times.map(time => (
        <div>
          {actividades.map((act, idx) => (
            //  <span className='text-xs'>
            //    {console.log(  ObtenerHora(act) === time  )}
            //    {ObtenerHora(act)}
            //  </span>

            ObtenerHora(act) === time ?
              <div
                className={`${ObtenerClaseColor(
                  act
                )} text-gray-600 text-sm rounded truncate p-0 m-0`}
                key={idx}
                onClick={() => {
                  setMostrarModalActividad(true);
                  setActividadSeleccionada(act);
                }}
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
              : ''
          ))}
        </div>
      ))}
    </div>
  )
}

export default DiaUsuario