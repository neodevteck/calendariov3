import React from 'react'

const Hora = ({ dia, actividades, indice }) => {
    return (
        <div>
            {actividades.map((act, idx) => (<div>
                {act.ASUNTO}
            </div>))}
        </div>
    )
}

export default Hora