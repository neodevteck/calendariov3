import React, { useState, useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import axios from 'axios';
import Spinner from './Spinner';
import { debounce } from '../util/util';

export default function BarraBusquedaUsu() {
  const [listaCoincidencias, setListaCoincidencias] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const [textoBusqueda, setTextoBusqueda] = useState('');



  const { setUsuarios, usuarios } = useContext(GlobalContext);
  function AgregarUsuario(obj) {
    console.log('AGREGAR USUARIO');
    setUsuarios((prevState) => {
      return [
        ...prevState.filter((item) => item.id !== obj.TERCEID_USU),
        {
          id: obj.TERCEID_USU,
          nombre: obj.NOMCOMPL_USU,
          checked: true,
          num: usuarios.length,
        },
      ];
    });
    setListaCoincidencias([]);
    setTextoBusqueda('');
    document.querySelector('#txtBusqueda').focus()
  }

  const test = (e) =>{
    setTextoBusqueda(e.target.value)
    buscaUsuarios(e)
  }

  const buscaUsuarios = React.useMemo(
    () => debounce((e) => {
      //setTextoBusqueda(e.target.value);   
      //console.log(textoBusqueda)
     if (e.target.value !== '') {    
      
      setCargando(true);
      axios
        .get(
        //.post(
          'http://localhost:3003/usuarios',
          //'frmCalendarioV2.aspx/ObtenerUsuario',
          {},
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            if (res.data.d !== undefined) {
              console.log(res.data.d);
              setListaCoincidencias(res.data.d)
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
    } 
    else {
      setListaCoincidencias([]);
    }
    }, 250),
    []
  );

  if (cargando) {
    return <Spinner />;
  }
  if (error) {
    return <div>Ha ocurrido un error</div>;
  }
  return (
    <React.Fragment>
     
      <input
      autoFocus 
        type='text'
        id='txtBusqueda'
        value={textoBusqueda}
        onChange={test}
        placeholder='  &#xf0c0;  Buscar a gente'
        style={{ fontFamily: 'FontAwesome' }}
        className='pt-2 border-0 text-black-200 text-l pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500  '
      />
      <ul className='suggestions'>
        {
     
        listaCoincidencias.map((row, i) => (
          <React.Fragment key={i}>
            <li className='' onClick={() => AgregarUsuario(row)}>
              {row.NOMCOMPL_USU}
            </li>
          </React.Fragment>
        ))  }
      </ul>
      {/* <ListaUsuarios lis = {ListaCoincidencias} /> */}
    </React.Fragment>
  );
}
