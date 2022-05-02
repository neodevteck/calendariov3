import React, { useContext } from 'react';
import Dia from './Dia';
import GlobalContext from '../context/GlobalContext';

const Mes = ({ mes }) => {
  const { idUsuarioLogueado, usuarios } = useContext(GlobalContext);
  console.log('id:' + idUsuarioLogueado);
  console.log(usuarios);
  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5 h-100vw'>
      {mes.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((dia, idx) => (
            <Dia dia={dia} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Mes;
