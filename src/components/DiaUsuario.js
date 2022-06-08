import React,{useContext} from 'react'
import GlobalContext from '../context/GlobalContext';

const DiaUsuario = ({ dia, actividades, indice,idUsuario }) => {
    const {           
        setActividadSeleccionada,
        ObtenerClaseColor,
        ObtenerColorUsuario,
        ObtenerHora,
        setMostrarModalDia, setMostrarModalActividad,ObtenerNombreUsuario
      } = useContext(GlobalContext);
    return (
     
        <div>
          <div> {ObtenerNombreUsuario(idUsuario)} </div>
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
    )
}

export default DiaUsuario