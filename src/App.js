import React, { useEffect, useState, useContext } from 'react';
import { getMonth } from './util/util';
import EncabezadoCalendario from './components/EncabezadoCalendario';
import MenuLateral from './components/MenuLateral';
import Mes from './components/Mes';
import ModalDia from './components/ModalDia';

import Spinner from './components/Spinner';
import GlobalContext from './context/GlobalContext';
import axios from 'axios';
//import useStore from './store/useStore';



const App = () => {
  console.log('APP');
  const [mesActual, setMesActual] = useState(getMonth());
  const {
    indiceMes,
    mostrarModalDia,
    setIdUsuarioLogueado,
    idUsuarioLogueado,
    setUsuarios,
  } = useContext(GlobalContext);

  
  // const setIdUsuarioLogueado = useStore( (state) => state.setIdUsuarioLogueado)
  // const setUsuarios = useStore( (state) => state.setUsuarios)
  // const mostrarModalDia = useStore( (state) => state.mostrarModalDia)
  // const idUsuarioLogueado = useStore( (state) => state.idUsuarioLogueado)
  // const indiceMes = useStore( (state) => state.indiceMes)


  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState();

  useEffect(() => {
    setCargando(true);
    axios
      .get(
      //.post(
        'http://localhost:3003/usuario',
        //'frmCalendarioV2.aspx/ObtenerUsuario',
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        //console.log(res);
        if (res.status === 200) {
          if (res.data.d !== undefined) {
            //console.log('usuario request');
            setIdUsuarioLogueado(res.data.d.id);
            setUsuarios((prevState) => {
              return [
                ...prevState.filter((item) => item.id !== res.data.d.id),
                {
                  id: res.data.d.id,
                  nombre: res.data.d.nombre,
                  checked: true,
                  num: 0,
                },
              ];
            });
          }
        }
      })
      .catch(() => {
        setError(true);
      })
      .then(() => {
        setCargando(false);
      });
  }, [setIdUsuarioLogueado, setUsuarios, idUsuarioLogueado]);

  useEffect(() => {
    setMesActual(getMonth(indiceMes));
  }, [indiceMes]);

  if (cargando) {
    return <Spinner />;
  }
  if (error) {
    return <div>Ha ocurrido un error</div>;
  }

  return (
    <React.Fragment>
      {mostrarModalDia === true && <ModalDia />}      
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
