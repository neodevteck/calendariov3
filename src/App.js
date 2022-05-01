import React, { useEffect, useState } from 'react';
import { getMonth } from './util/util';
import EncabezadoCalendario from './components/EncabezadoCalendario';
import MenuLateral from './components/MenuLateral';
import Mes from './components/Mes';
import useStore from './store/useStore';
const App = () => {
  console.log('APP');
  const [mesActual, setMesActual] = useState(getMonth());
  const indiceMes = useStore((state) => state.indiceMes);

  useEffect(() => {
    setMesActual(getMonth(indiceMes));
  }, [indiceMes]);

  return (
    <React.Fragment>
      <div className='h-screen flex flex-col'>
        <EncabezadoCalendario />
        <div className='flex flex-1'>
          <MenuLateral />
          <Mes mes={mesActual} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
