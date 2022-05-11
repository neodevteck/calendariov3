import React, { useContext } from 'react'
import GlobalContext from '../Context/GlobalContext'
import Spinner from './Spinner'
import App from '../App'

const Contenido = () => {
    const {usuarios} = useContext(GlobalContext)
  return (
     <React.Fragment>
         { usuarios ? <App/> : <Spinner/> }
     </React.Fragment>
  )
}

export default Contenido