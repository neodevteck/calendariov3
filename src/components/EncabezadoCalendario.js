import React, { useContext } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../context/GlobalContext';
//import useStore from '../store/useStore';
const EncabezadoCalendario = () => {
  // const indiceMes = useStore((state) => state.indiceMes);
  // const setIndiceMes = useStore((state) => state.setIndiceMes);  
  //const usuarios = useStore((state) => state.usuarios);
  const { indiceMes, setIndiceMes,setOpcionVista } = useContext(GlobalContext);
  //console.log(usuarios);
  function mesAnterior() {
    setIndiceMes(indiceMes - 1);
  }
  function mesSiguiente() {
    setIndiceMes(indiceMes + 1);
  }
  function Resetear() {
    setIndiceMes(
      indiceMes === dayjs().month()
        ? indiceMes + Math.random()
        : dayjs().month()
    );
  }  
  function OpcionVista(e){
    //console.log(e.target.value)
    setOpcionVista(e.target.value)
  }

  return (
    <React.Fragment>
      
      <header className='px-4 py-2 flex items-center'>
      <button 
       onClick={(e) => (
              (window.location.href = `frmCalendario.aspx`),
              '_blank'
            )}
      >
          <span className='cursor-pointer text-gray-600 mx-2'>
            <i className='fa fa-arrow-left'></i>
          </span>
        </button>
        <h1 className='mr-10 text-xl text-gray-500 fond-bold'>Calendario</h1>
        <button onClick={Resetear} className='border rounded py-2 px-4 mr-5'>
          Hoy
        </button>
        <button onClick={mesAnterior}>
          <span className='cursor-pointer text-gray-600 mx-2'>
            <i className='fa fa-angle-left'></i>
          </span>
        </button>
        <button onClick={mesSiguiente}>
          <span className='cursor-pointer text-gray-600 mx-2'>
            <i className='fa fa-angle-right'></i>
          </span>
        </button>
        <h2 className='ml-4 text-xl text-gray-500 font-bold'>
          {dayjs(new Date(dayjs().year(), indiceMes)).format('MMMM YYYY')}
        </h2>
        <select
          className='form-select form-select-sm     
          block
          px-2
          py-1
          ml-2
          text-sm
          font-normal
          text-gray-700
          bg-white bg-clip-padding bg-no-repeat
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
          aria-label='.form-select-sm example'  onChange={OpcionVista}
        >
          <option defaultValue={'1'} value='1'>
            Mes
          </option>
          <option value='2'>Dia</option>
        </select>
      </header>
    </React.Fragment>
  );
};

export default EncabezadoCalendario;
