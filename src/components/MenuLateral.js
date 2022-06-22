import React from 'react';
import MiniCalendario from './MiniCalendario';
import BarraBusquedaUsu from './BarraBusquedaUsu';
import Usuarios from './Usuarios';

const MenuLateral = () => {
  return (
    <aside className='border p-5 ' style={{minWidth:'16rem'}}>
      <MiniCalendario />
      <BarraBusquedaUsu />
      <Usuarios />
    </aside>
  );
};

export default MenuLateral;
