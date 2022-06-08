import React from 'react';
import DiaUsuario from './DiaUsuario';
import dayjs from 'dayjs';

const DetalleDia = ({ data }) => {
  return (
    <div className=''>
      {data.d.map((x, i) => {
        return (
          <DiaUsuario
            key={i}
            dia={dayjs(x.Fecha, 'DD-MM-YYYY', 'es')}
            actividades={x.Actividades ? JSON.parse(x.Actividades) : []}
            indice={i}
            idUsuario = {x.IdUsuario}
          />
        );
      })}
    </div>
  );
};

export default DetalleDia;
