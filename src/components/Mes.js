import React from 'react';

const Mes = ({ mes,data }) => {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 h-100vw">  
      {data.d.map((x) =>(        
        <div> {x.Fecha} </div>
      ))}
    </div>
  );
};

export default Mes;
