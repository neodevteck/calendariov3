import React from 'react';
import Dia from './Dia';
import dayjs from 'dayjs';

const Mes = ({ mes, data }) => {
  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5 h-100vw'>
      {data.d.map((x, i) => {
        return (
          <Dia
            key={x.Fecha}
            dia={dayjs(x.Fecha, 'DD-MM-YYYY', 'es')}
            actividades={x.Actividades ? JSON.parse(x.Actividades) : []}
            indice={i}
          />
        );
      })}
    </div>
  );
};

export default Mes;
