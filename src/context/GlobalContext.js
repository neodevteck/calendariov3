import React from 'react';

const GlobalContext = React.createContext({
  indiceMes: 0,
  setIndiceMes: (val) => {},
  mesMiniCalendario: 0,
  setMesMiniCalendario: (val) => {},
  diaSeleccionado: 0,
  setDiaSeleccionado: (val) => {},
  actividadSeleccionada: null,
  setActividadSeleccionada: (val) => {},
  mostrarModalDia: false,
  setMostrarModalDia: (val) => {},
  mostrarModalActividad: false,
  setMostrarModalActividad: (val) => {},
  idUsuarioLogueado: 0,
  setIdUsuarioLogueado: (val) => {},
  usuarios: [],
  setUsuarios: (val) => {},
  updateUsuario: (val) => {},
  colores: [],
  actividadesMes: [],
  setActividadesMes: (val) => {},
  setOpcionVista: () => {},
  opcionVista: 0,
  ObtenerColorUsuario: (val) => {},
  ObtenerClaseColor: (val) => {},
  ObtenerHora: (val) => {},
  ObtenerNombreUsuario:(val) =>{}
});

export default GlobalContext;
