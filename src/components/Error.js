import React from 'react'

const Error = () => {
    return <React.Fragment>
    <div className='mr-10 text-xl text-gray-500 fond-bold text-center'>
       Ha ocurrido un error,presione la flecha para volver a la version anterior
    </div>
    <div>
      <button
        onClick={(e) => (
          (window.location.href = `frmCalendario.aspx`),
          '_blank'
        )}>
        <span className='cursor-pointer text-gray-600 mx-2 text-center'>
          <i className='fa fa-arrow-left'></i>
        </span>
      </button>
    </div>
  </React.Fragment>;
}

export default Error