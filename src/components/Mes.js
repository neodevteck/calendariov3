import React from 'react';
import Dia from './Dia';

const Mes = ({ mes }) => {
  return (
    <div className='flex-1 grid grid-cols-7 grid-rows-5 h-100vw'>
      {mes.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((dia, idx) => (
            <Dia dia={dia} key={idx} rowIdx={i}  />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Mes;
