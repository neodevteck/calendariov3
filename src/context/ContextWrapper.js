import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalContext from './GlobalContext';
import SecureStorage from 'secure-web-storage'

//var CryptoJS = require("crypto-js");
import CryptoJS from 'crypto-js';
let SECRET_KEY = 'llaveUltraSecreta007+-*';

const ContextWrapper = (props) => {

  let secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key) {
        key = CryptoJS.SHA256(key, SECRET_KEY);
        return key.toString();
    },
    encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, SECRET_KEY);
        data = data.toString();
        return data;
    },
    decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, SECRET_KEY);
        data = data.toString(CryptoJS.enc.Utf8);
        return data;
    }
  });
  

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
    //console.log('USUARIO LOGIN');
    axios
      .get('http://localhost:3003/usuario')
      // .post(
      //   'frmCalendarioV2.aspx/ObtenerUsuario',
      //   {},
      //   {
      //     headers: { 'Content-Type': 'application/json' },
      //   }
      // )
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
            ];

            let storageKey = `${res.data.d.id}`
            let a = secureStorage.getItem(storageKey)
            console.log(a)
            console.log(res.data.d.id)

            if (secureStorage.getItem(storageKey) !== null) {
              //if (localStorage.getItem('LU' + res.data.d.id) !== null) {
              setUsuarios(
                //JSON.parse(localStorage.getItem('LU' + res.data.d.id))
                secureStorage.getItem(storageKey)
              );
            } else {
              //localStorage.setItem('LU' + res.data.d.id, JSON.stringify(obj));
              secureStorage.setItem(obj);
              setUsuarios(obj);
            }
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

  function ObtenerHexColor(evt) {
    let claseColor = '#135995';
    if (evt.ESTADO === 3) {
      claseColor = '#008000';
    } else if (
      evt.USUARIOSID != idUsuarioLogueado &&
      evt.ESTADO_FLUJOTRABAJO === 1
    ) {
      claseColor = '#6397c3';
    } else if (evt.USUARIOSID === idUsuarioLogueado && evt.ESTADO === 1) {
      claseColor = '#135995';
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
      if (usuarios[i].id == id) {
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

  function ObtenerHoraIniDetalleDia(evt) {
    if (evt.HORACALINI !== 'undefined' && evt.HORACALINI !== '' && evt.HORACALINI !== '00:00') {
      return evt.HORACALINI;
    }
    if (evt.HORACALINI2 !== 'undefined' && evt.HORACALINI2 !== '' && evt.HORACALINI2 !== '00:00') {
      return evt.HORACALINI2;
    }
    if (evt.HORACALINI3 !== 'undefined' && evt.HORACALINI3 !== '' && evt.HORACALINI3 !== '00:00') {
      return evt.HORACALINI3;
    }
    if (evt.HORACALINI4 !== 'undefined' && evt.HORACALINI4 !== '' && evt.HORACALINI4 !== '00:00') {
      return evt.HORACALINI4;
    }
    return '';
  }

  function ObtenerHoraFinDetalleDia(evt) {
    if (evt.HORACALFIN !== 'undefined' && evt.HORACALFIN !== '' && evt.HORACALFIN !== '00:00') {
      return evt.HORACALFIN;
    }
    if (evt.HORACALFIN2 !== 'undefined' && evt.HORACALFIN2 !== '' && evt.HORACALFIN2 !== '00:00') {
      return evt.HORACALFIN2;
    }
    if (evt.HORACALFIN3 !== 'undefined' && evt.HORACALFIN3 !== '' && evt.HORACALFIN3 !== '00:00') {
      return evt.HORACALFIN3;
    }
    if (evt.HORACALFIN4 !== 'undefined' && evt.HORACALFIN4 !== '' && evt.HORACALFIN4 !== '00:00') {
      return evt.HORACALFIN4;
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
        ObtenerNombreUsuario,
        ObtenerHoraIniDetalleDia,
        ObtenerHoraFinDetalleDia,
        ObtenerHexColor,
        secureStorage
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
