import React from 'react'

const DetalleDia = ({data}) => {
  return (
    <div className='flex-1'>
        {console.log(data)}
        {data.d.map((x, i) => {
        //console.log(x.Fecha);
        // console.log(dayjs(x.Fecha, "DD-MM-YYYY",'es'))
        // return (
        //     <div className='text-center'>
                
        //     </div>
        // );
        {x.Actividades ? JSON.parse(x.Actividades).map((x) => {
            return (
              <React.Fragment key={x.FLUJOTRABAJOID}>
                <div className='block text-center  border-t border-gray-200 rounded-b-md'>
                  {x.ASUNTO}
                </div>
              </React.Fragment>
            )
          }) :  <div>nada</div>} 
      })}
    
    </div>

  )
}

export default DetalleDia