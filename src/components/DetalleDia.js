import React from 'react';
import DiaUsuario from './DiaUsuario';
import dayjs from 'dayjs';

const DetalleDia = ({ data }) => {
  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5 h-100vw'>
      {data.d.map((x, i) => {
        return (
          <DiaUsuario
            key={i}
            dia={dayjs(x.Fecha, 'DD-MM-YYYY', 'es')}
            actividades={x.Actividades ? JSON.parse(x.Actividades) : []}
            indice={i}
          />
        );
      })}
    </div>
  );
};

export default DetalleDia;
