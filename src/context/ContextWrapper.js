import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalContext from './GlobalContext';

const ContextWrapper = (props) => {
  const [indiceMes, setIndiceMes] = useState(dayjs().locale('es').month());
  const [mesMiniCalendario, setMesMiniCalendario] = useState(null);
  const [opcionVista, setOpcionVista] = useState(1);
  const [diaSeleccionado, setDiaSeleccionado] = useState(dayjs());
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
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
            let obj = [
              {
                id: res.data.d.id,
                nombre: res.data.d.nombre,
                checked: true,
                num: 0,
              },
            ]
            if (localStorage.getItem('LU'+res.data.d.id) !== null) {
              //console.log(localStorage.getItem('LU'+res.data.d.id))
              setUsuarios(JSON.parse(localStorage.getItem('LU'+res.data.d.id)));
           }
            else{
              localStorage.setItem('LU'+res.data.d.id, JSON.stringify(obj))
              setUsuarios(obj)
           }

            // setUsuarios([
            //   {
            //     id: res.data.d.id,
            //     nombre: res.data.d.nombre,
            //     checked: true,
            //     num: 0,
            //   },
            // ]);
          }
        }
      })
      .catch(() => {
        alert('Ha ocurrido un error');
        window.location = 'frmCalendario.aspx';
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

  function ObtenerClaseColor(evt) {
    let claseColor = 'colorAzul';
    if (evt.ESTADO === 3) {
      claseColor = 'colorVerde';
    } else if (
      evt.USUARIOSID != idUsuarioLogueado &&
      evt.ESTADO_FLUJOTRABAJO === 1
    ) {
      claseColor = 'colorAzulClaro';
    } else if (evt.USUARIOSID === idUsuarioLogueado && evt.ESTADO === 1) {
      claseColor = 'colorAzul';
    }
    return claseColor;
  }

  function ObtenerColorUsuario(evt) {
    for (let i = 0; i < usuarios.length; i++) {
      if (
        usuarios[i].id == evt.TERCERECURSOCTROLID ||
        usuarios[i].id == evt.TERCERECURSOCTROL2ID ||
        usuarios[i].id == evt.TERCERECURSOCTROL3ID ||
        usuarios[i].id == evt.TERCERECURSOCTROL4ID
      ) {
        return 'bg-' + colores[usuarios[i].num];
      }
    }
    return '';
  }

  function ObtenerNombreUsuario(id) {
    for (let i = 0; i < usuarios.length; i++) {
      if (
        usuarios[i].id == id
      ) {
        return usuarios[i].nombre;
      }
    }
    return '';
  }

  function ObtenerHora(evt) {
    for (let i = 0; i < usuarios.length; i++) {
      if (
        usuarios[i].id == evt.TERCERECURSOCTROLID &&
        evt.HORACALINI !== '' &&
        evt.HORACALFIN !== '00:00'
      ) {
        return evt.HORACALINI + '-' + evt.HORACALFIN;
      }
      if (
        usuarios[i].id == evt.TERCERECURSOCTROL2ID &&
        evt.HORACALINI2 !== '' &&
        evt.HORACALFIN2 !== '00:00'
      ) {
        return evt.HORACALINI2 + '-' + evt.HORACALFIN2;
      }
      if (
        usuarios[i].id == evt.TERCERECURSOCTROL3ID &&
        evt.HORACALINI3 !== '' &&
        evt.HORACALFIN3 !== '00:00'
      ) {
        return evt.HORACALINI3 + '-' + evt.HORACALFIN3;
      }
      if (
        usuarios[i].id == evt.TERCERECURSOCTROL4ID &&
        evt.HORACALINI4 !== '' &&
        evt.HORACALFIN4 !== '00:00'
      ) {
        return evt.HORACALINI4 + '-' + evt.HORACALFIN4;
      }
    }
    return '';
  }
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
        opcionVista,
        setOpcionVista,
        actividadSeleccionada,
        setActividadSeleccionada,
        ObtenerColorUsuario,
        ObtenerClaseColor,
        ObtenerHora,
        ObtenerNombreUsuario
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
