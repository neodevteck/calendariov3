import React, { useState, useContext, useEffect } from 'react';
import { getMonth } from './util/util';
import EncabezadoCalendario from './components/EncabezadoCalendario';
import MenuLateral from './components/MenuLateral';
import Mes from './components/Mes';
import DetalleDia from './components/DetalleDia';
import GlobalContext from './context/GlobalContext';
import ModalDia from './components/ModalDia';
import dayjs from 'dayjs';
import Spinner from './components/Spinner';
import useActividades from './react-query/useActividades';
import ModalActividad from './components/ModalActividad';
import Error from './components/Error';

const App = () => {
  //console.log('APP');
  const [mesActual, setMesActual] = useState(getMonth());
  const {
    indiceMes,
    mostrarModalDia,
    mostrarModalActividad,
    usuarios,
    opcionVista,
    diaSeleccionado,
  } = useContext(GlobalContext);

  useEffect(() => {
    setMesActual(getMonth(indiceMes));
  }, [indiceMes]);

  //console.log(diaSeleccionado)

  let arrIds = usuarios
    ? usuarios.filter((lbl) => lbl.checked).map((lbl) => lbl.id)
    : [0];
  let fechaIni =  opcionVista =='1' ? dayjs(getMonth(indiceMes)[0][0]).format('DD-MM-YY').toString() : diaSeleccionado.toString();
  let fechaFin =  opcionVista =='1' ? dayjs(getMonth(indiceMes)[4][6]).format('DD-MM-YY').toString() : diaSeleccionado.toString();

  const { data, status } = useActividades(
    fechaIni,
    fechaFin,
    arrIds ? arrIds : [],
    opcionVista
  );

  if (status === 'loading') {
    return <Spinner />;
  } else if (status === 'error') {
    return <Error />;
  }
  console.log(data);

  return (
    <React.Fragment>
      {mostrarModalDia === true && <ModalDia usuIds={arrIds} />}
      {mostrarModalActividad === true && <ModalActividad />}

      <div className='h-screen flex flex-col'>
        <EncabezadoCalendario />
        <div className='flex flex-1'>
          <MenuLateral />

          {opcionVista == '1' && <Mes mes={mesActual} data={data} />}
          {opcionVista == '2' && <DetalleDia data={data} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
