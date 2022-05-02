import dayjs from 'dayjs';
import { useState } from 'react';

import GlobalContext from './GlobalContext';
const ContextWrapper = (props) => {
  const [indiceMes, setIndiceMes] = useState(dayjs().locale('es').month());
  const [mesMiniCalendario, setMesMiniCalendario] = useState(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState(dayjs());
  const [mostrarModalDia, setMostrarModalDia] = useState(false);
  const [idUsuarioLogueado, setIdUsuarioLogueado] = useState(0);
  const [usuarios, setUsuarios] = useState([]);
  const colores = ['pink-500','red-500','purple-600','deep-purple-600','indigo-600','blue-600','cyan-600','teal-600','green-600','lime-600',
  'yellow-600','orange-600','brown-500','grey-500','blue-grey-600'];  

  function updateUsuario(usu) {
    setUsuarios(
      usuarios.map((lbl) => (lbl.id === usu.id ? usu : lbl))
    );    
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
        idUsuarioLogueado,
        setIdUsuarioLogueado,
        usuarios,
        setUsuarios,
        updateUsuario,
        colores
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
