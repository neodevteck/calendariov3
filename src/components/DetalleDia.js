import React from 'react';
import DiaUsuario from './DiaUsuario';
import dayjs from 'dayjs';
import {strToDate} from '../util/util';

const DetalleDia = ({ data }) => {
  return (
    <div className=''>
      {data.d.map((x, i) => {
        console.log(x.Fecha)
        return (
          <DiaUsuario
            key={i}
            dia={strToDate(x.Fecha)}
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
