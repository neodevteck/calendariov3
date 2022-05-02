import React from 'react';

const GlobalContext = React.createContext({
  indiceMes: 0,
  setIndiceMes: (val) => {},
  mesMiniCalendario: 0,
  setMesMiniCalendario: (val) => {},
  diaSeleccionado: 0,
  setDiaSeleccionado: (val) => {},
  mostrarModalDia: false,
  setMostrarModalDia: (val) => {},
  idUsuarioLogueado: 0,
  setIdUsuarioLogueado: (val) => {},
  usuarios: [],
  setUsuarios: (val) => {},
  updateUsuario: (val) => {},
  colores:[]
});

export default GlobalContext;
