import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { Recortar } from '../util/util';

export default function Usuarios() {
  const { usuarios, updateUsuario, DeleteUsuario, colores, idUsuarioLogueado,nitEmpresaUsuLogueado } =
    useContext(GlobalContext);
    const ObtenerColorUsuario = (num,id)=>{
    if (id === 5 && nitEmpresaUsuLogueado === '900332071' ){
      let fecha = new Date('08-01-2022');
      let hoy = new Date();
      if(hoy > fecha)
      {
          return colores[10]
      }
      else
      {          
          return colores[num]
      }    
    }
    return colores[num]
  }  
  return (
    <React.Fragment>
      <p className='text-gray-500 font-bold mt-10'>Usuarios</p>
      {usuarios.map(({ id, checked, nombre, num,rutaFoto }, idx) => (
        <div key={id } style={{display:'flex'}}>
          <input
            type='checkbox'
            checked={checked}
            onChange={() =>
              updateUsuario({
                id: id,
                checked: !checked,
                nombre: nombre,
                num: num,
                rutaFoto:rutaFoto
              })
            }
            className={`form-checkbox h-5 w-5 accent-${ObtenerColorUsuario(num,id)}  rounded focus:ring-0 cursor-pointer`}
          />
          <span className={`ml-2 text-gray-700 capitalize`}>{Recortar(nombre,20)}</span>
          <img src={ rutaFoto ? `../../Temporal/FotosTerce/${rutaFoto}` : '../../App_Themes/AzulCielo/Imagenes/user.png' } alt={`F`} className='imgUsuario' />
          {id !== idUsuarioLogueado && (
            <span className='pl-1 font-thin' onClick={() => DeleteUsuario(id)}>
              <i className='fa fa-times '></i>
            </span>
          )}
        </div>
      ))}
    </React.Fragment>
  );
}
