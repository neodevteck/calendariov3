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
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
