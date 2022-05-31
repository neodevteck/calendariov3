import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function Usuarios() {
  const { usuarios, updateUsuario, DeleteUsuario, colores, idUsuarioLogueado } =
    useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className='text-gray-500 font-bold mt-10'>Usuarios</p>
      {usuarios.map(({ id, checked, nombre, num }, idx) => (
        <div key={id}>
          <input
            type='checkbox'
            checked={checked}
            onChange={() =>
              updateUsuario({
                id: id,
                checked: !checked,
                nombre: nombre,
                num: num,
              })
            }
            className={`form-checkbox h-5 w-5 accent-${colores[num]}  rounded focus:ring-0 cursor-pointer`}
          />
          <span className={`ml-2 text-gray-700 capitalize`}>{nombre}</span>
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
