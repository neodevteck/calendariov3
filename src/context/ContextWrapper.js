import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Error from '../components/Error';

import GlobalContext from './GlobalContext';
const ContextWrapper = (props) => {
  const [indiceMes, setIndiceMes] = useState(dayjs().locale('es').month());
  const [mesMiniCalendario, setMesMiniCalendario] = useState(null);
  const [opcionVista, setOpcionVista] = useState(1);

  const [diaSeleccionado, setDiaSeleccionado] = useState(dayjs());
  const [actividadSeleccionada, setActividadSeleccionada] = useState(0);

  const [mostrarModalDia, setMostrarModalDia] = useState(false);
  const [mostrarModalActividad, setMostrarModalActividad] = useState(false);

  const [idUsuarioLogueado, setIdUsuarioLogueado] = useState(0);
  const [usuarios, setUsuarios] = useState(null);
  const [actividadesMes, setActividadesMes] = useState([]);
  const colores = [
    'pink-500',
    'red-500',
    'purple-600',
    'deep-purple-600',
    'indigo-600',
    'blue-600',
    'cyan-600',
    'teal-600',
    'green-600',
    'lime-600',
    'yellow-600',
    'orange-600',
    'brown-500',
    'grey-500',
    'blue-grey-600',
  ];

  useEffect(() => {
    console.log('USUARIO LOGIN');
    axios
      //.get('http://localhost:3003/usuario')
      .post(
        'frmCalendarioV2.aspx/ObtenerUsuario',
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          if (res.data.d !== undefined) {
            setIdUsuarioLogueado(res.data.d.id);
            setUsuarios([
              {
                id: res.data.d.id,
                nombre: res.data.d.nombre,
                checked: true,
                num: 0,
              },
            ]);
          }
        }
      })
      .catch(() => {
         alert('Ha ocurrido un error');window.location = 'frmCalendario.aspx'
      });
  }, []);

  useEffect(() => {
    if (mesMiniCalendario !== null) {
      setMesMiniCalendario(mesMiniCalendario);
    }
  }, [mesMiniCalendario]);

  function updateUsuario(usu) {
    setUsuarios(usuarios.map((x) => (x.id === usu.id ? usu : x)));
  }

  function DeleteUsuario(id) {
    setUsuarios(usuarios.filter((x) => x.id !== id));
  }

  // const filtrarActividades = useMemo(() => {
  //   //console.log(actividadesMes)
  //   console.log('filtro')
  //   return actividadesMes ? actividadesMes.filter((evt) =>
  //     usuarios
  //       .filter((lbl) => lbl.checked)
  //       .map((lbl) => lbl.id)
  //       .includes(evt.TERCERECURSOCTROLID)
  //   ):[]
  // }, [actividadesMes, usuarios]);

  return (
    <GlobalContext.Provider
      value={{
        indiceMes,
        setIndiceMes,
        mesMiniCalendario,
        setMesMiniCalendario,
        diaSeleccionado,
        setDiaSeleccionado,
        mostrarModalDia,
        setMostrarModalDia,
        mostrarModalActividad,
        setMostrarModalActividad,
        idUsuarioLogueado,
        setIdUsuarioLogueado,
        usuarios,
        setUsuarios,
        updateUsuario,
        DeleteUsuario,
        colores,
        actividadesMes,
        setActividadesMes,
        //filtrarActividades,
        opcionVista,
        setOpcionVista,
        actividadSeleccionada,
        setActividadSeleccionada
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
