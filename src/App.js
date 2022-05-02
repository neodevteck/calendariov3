import React, { useEffect, useState, useContext } from 'react';
import { getMonth } from './util/util';
import EncabezadoCalendario from './components/EncabezadoCalendario';
import MenuLateral from './components/MenuLateral';
import Mes from './components/Mes';
import dayjs from 'dayjs';
import ModalDia from './components/ModalDia';

import Spinner from './components/Spinner';
import GlobalContext from './context/GlobalContext';
import axios from 'axios';
//import useActividades from './react-query/useActividades';
//import useStore from './store/useStore';
const App = () => {
  console.log('APP');
  const [mesActual, setMesActual,opcionVista] = useState(getMonth());
  const {
    indiceMes,
    mostrarModalDia,
    setIdUsuarioLogueado,
    idUsuarioLogueado,
    setUsuarios,
    usuarios,
    setActividadesMes
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
      //.get(
      .post(
        //'http://localhost:3003/usuario',
        'frmCalendarioV2.aspx/ObtenerUsuario',
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
            setUsuarios([{id:res.data.d.id,nombre:res.data.d.nombre,checked:true,num:0}]);
          }
        }
      })
      .catch(() => {
        setError(true);
      })
      .then(() => {
        setCargando(false);
      });
  }, [setIdUsuarioLogueado, setUsuarios]);

  // useEffect(() => {
  //   setMesActual(getMonth(indiceMes));
  // }, [indiceMes]);

  useEffect(() => {
    setMesActual(getMonth(indiceMes));
    let arrIds = usuarios.map(x => x.id)
    setCargando(true);
    axios
      .post(
        //.get(
        //'http://localhost:3003/actividades',
        ('frmCalendarioV2.aspx/ObtenerActividadesxTerceIdxFechaInixFechaFin', {FechaInicial:dayjs(getMonth(indiceMes)[0][0]).format("DD-MM-YY").toString(),FechaFinal:dayjs(getMonth(indiceMes)[4][6]).format("DD-MM-YY").toString(),ArrIds: arrIds ? arrIds : [],Tipo:opcionVista}, {
      headers: { 'Content-Type': 'application/json' }
    })
      
      ).then((res) => {
        //console.log(res);
        if (res.status === 200) {          
          if (res.data.d !== undefined) {
            //console.log(res.data.d);
            setActividadesMes(res.data.d)
            //document.querySelector('#txtBusqueda').value = e.target.value;
          }
        }
      })
      .catch(() => {      
        setError(true);
      })
      .then(() => {      
       setCargando(false);
      });
    },[indiceMes, setActividadesMes, usuarios])
  
      if(cargando){
        return <Spinner/>
      }
      if(error){
        return <div>Ha ocurrido un error</div>
      }


  // if (cargando) {
  //   return <Spinner />;
  // }
  // if (error) {
  //   return <div>Ha ocurrido un error</div>;
  // }

//const {data} = useActividades(mesActual[0][0].format("DD-MM-YY").toString(),mesActual[4][6].format("DD-MM-YY").toString(),usuarios.map(x => x.id))
// console.log(mesActual[0][0])
// console.log(mesActual[4][6])
// console.log(usuarios.map(x => x.id))

  return (
    <React.Fragment>
      {/* {mostrarModalDia === true && <ModalDia />}       */}
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
