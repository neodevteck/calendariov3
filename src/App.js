import React, {  useState, useContext,useEffect } from 'react';
import { getMonth } from './util/util';
import EncabezadoCalendario from './components/EncabezadoCalendario';
import MenuLateral from './components/MenuLateral';
import Mes from './components/Mes';
import GlobalContext from './context/GlobalContext';
import ModalDia from './components/ModalDia'
import dayjs from 'dayjs';
import Spinner from './components/Spinner';
import useActividades from './react-query/useActividades';

const App = () => {
  console.log('APP');
  const [mesActual, setMesActual] = useState(getMonth());
  const {
    indiceMes,
    mostrarModalDia,
    usuarios,
    opcionVista
  } = useContext(GlobalContext);
  useEffect(() => {
    setMesActual(getMonth(indiceMes))
  }, [indiceMes])
  
  let arrIds = usuarios.map(x => x.id)
  let fechaIni = dayjs(getMonth(indiceMes)[0][0]).format("DD-MM-YY").toString()
  let fechaFin = dayjs(getMonth(indiceMes)[4][6]).format("DD-MM-YY").toString()

  const {data,status} = useActividades(fechaIni,fechaFin,arrIds ? arrIds : [],opcionVista)

  if (status === 'loading'){
    return <Spinner />
  }
  else if(status === 'error'){
    return <div>Error</div>
  }
  console.log(data)

  return (
    <React.Fragment>
      {mostrarModalDia === true && <ModalDia />}      
      <div className='h-screen flex flex-col'>
        <EncabezadoCalendario />
        <div className='flex flex-1'>
          <MenuLateral />
          <Mes mes={mesActual} data={data} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
