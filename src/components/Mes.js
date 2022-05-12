import React from 'react';
import Dia from './Dia';

const Mes = ({ mes,data }) => {
  
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 h-100vw">  
      {data.d.map((x,i) =>{  
        // console.log(x.Actividades)
        // console.log(JSON.parse(x.Actividades))
         return <Dia dia={x.Fecha} actividades={x.Actividades ? JSON.parse(x.Actividades):[]} indice={i}  />
        } 
      )}
    </div>
  );
};

export default Mes;
