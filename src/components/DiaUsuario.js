import React, { useContext,useRef,useEffect } from 'react'
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

  const ref = useRef()
  useEffect(() => {
    const svgElement = d3.select(ref.current)
    svgElement.append("circle")
      .attr("cx", 150)
      .attr("cy", 70)
      .attr("r",  50)
  }, [])

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
      {/* <div> {ObtenerNombreUsuario(idUsuario)} </div>
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
      ))} */}
    <svg
      ref={ref}
    />
      
    </div>
  )
}

export default DiaUsuario