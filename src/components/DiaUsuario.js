import React, { useContext, useRef, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import * as d3 from 'd3';
import dayjs from 'dayjs';
import { Recortar } from '../util/util';

const DiaUsuario = ({ dia, actividades, indice, idUsuario }) => {
  const {
    setActividadSeleccionada,
    ObtenerClaseColor,
    ObtenerColorUsuario,
    ObtenerHora,
    setMostrarModalDia,
    setMostrarModalActividad,
    ObtenerUsuario,
    ObtenerHoraIniDetalleDia,
    ObtenerHoraFinDetalleDia,
    ObtenerHexColor
    
  } = useContext(GlobalContext);

  const currentDate = new Date();
const timestamp = currentDate.getTime();

  // console.log(
  //   new Date(
  //     dayjs(dia).format('MM/DD/YYYY').toString() +
  //       ' ' +
  //       ObtenerHoraFinDetalleDia(actividades[0])
  //   )
  // );

  //console.log(actividades);
  // console.log(dayjs(dia).format('MM/DD/YYYY'));
  // let a = new Date(dayjs(dia).format('MM/DD/YYYY') + ' 12:37');
  // //let a = dayjs('12:37').format('HH');
  //console.log(new Date('05/01/2022 08:00'));
  // const calendarEvents = [
  //   {
  //     timeFrom: '2020-11-11T05:00:00.000Z',
  //     timeTo: '2020-11-11T12:00:00.000Z',
  //     title: 'Sleep',
  //     background: '#616161',
  //   },
  //   {
  //     timeFrom: '2020-11-11T16:00:00.000Z',
  //     timeTo: '2020-11-11T17:30:00.000Z',
  //     title: 'Business meeting',
  //     background: '#33B779',
  //   },
  //   {
  //     timeFrom: '2020-11-12T00:00:00.000Z',
  //     timeTo: '2020-11-12T05:00:00.000Z',
  //     title: 'Wind down time',
  //     background: '#616161',
  //   },
  // ];
  // Make an array of dates to use for our yScale later on
  // const dates = [
  //   ...calendarEvents.map((d) => new Date(d.timeFrom)),
  //   ...calendarEvents.map((d) => new Date(d.timeTo)),
  // ];

  // for(let i = 0 ; i < actividades.length; i++){
  //   console.log(dayjs(dia).format('MM/DD/YYYY') + ' ' + ObtenerHoraIniDetalleDia(actividades[i]))
  // }

  const dates = [
    ...actividades.map(
      (d) =>
        new Date(
          dayjs(dia).format('MM/DD/YYYY').toString() + ' ' + ObtenerHoraIniDetalleDia(d)
        )
    ),
    ...actividades.map(
      (d) =>
        new Date(
          dayjs(dia).format('MM/DD/YYYY').toString() + ' ' + ObtenerHoraFinDetalleDia(d)
        )
    ),
  ];

  let horaIni =  new Date(
    dayjs(dia).format('MM/DD/YYYY').toString() + ' ' + '01:00'
  )

  let horaFin =  new Date(
    dayjs(dia).format('MM/DD/YYYY').toString() + ' ' + '23:59'
  )

//   console.log(horaIni)
//   console.log(horaFin)
dates.push(horaIni)
dates.push(horaFin)


  const margin = { top: 30, right: 0, bottom: 30, left: 50 }; // Gives space for axes and other margins
  const height = 1500;
  const width = 500;
  const barWidth = 500;
  const nowColor = '#000';
  const barStyle = {
    background: '#000',
    textColor: 'white',
    width: barWidth,
    startPadding: 2,
    endPadding: 3,
    radius: 3,
  };
  //console.log(dates);
  const ref = useRef();
  useEffect(() => {
    // const svgElement = d3.select(ref.current)
    // svgElement.append("circle")
    //   .attr("cx", 150)
    //   .attr("cy", 70)
    //   .attr("r",  50)

    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height);

    let ele = document.querySelector('.testChart');

    // var tag = document.createElement("p");
    // var text = document.createTextNode("Tutorix is the best e-learning platform");
    // tag.appendChild(text);

    // ele.appendChild(tag);

    ele.append(svg.node());

    // svg
    // .append('g')    
    // .attr('width', '200')
    // .attr('height', '200');
     
    // svg
    // .attr('font-family', 'Roboto')
    // .attr('font-size', 15)
    // .attr('font-weight', 900)
    // .attr('text-anchor', 'start')
    // .attr('fill', '#000')
    // .attr('width', '200')
    // .attr('height', '200')
    //   .text((ObtenerNombreUsuario(idUsuario)));



    const yScale = d3
      .scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([margin.top, height - margin.bottom]);

    const yAxis = d3.axisLeft().ticks(24).scale(yScale);

    if (indice === 0){
      svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .attr('opacity', 0.5)
      .call(yAxis);
      
    }else{
     margin.left = 0   
    }
    
    // svg
    //   .selectAll('g.tick')
    //   .filter((d, i, ticks) => i === 0 || i === ticks.length - 1)
    //   .select('text')
    //   .text('12 AM');

    const gridLines = d3
      .axisRight()
      .ticks(24)
      .tickSize(barStyle.width) // even though they're "ticks" we've set them to be full-width
      .tickFormat('')
      .scale(yScale);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .attr('opacity', 0.3)
      .call(gridLines);
    const barGroups = svg
      .selectAll('g.barGroup')
      .data(actividades)
      .join('g')
      .attr('class', 'barGroup')
    barGroups
      .append('rect')
      .attr('fill', (d) =>  ObtenerHexColor(d))
      .attr('x', margin.left)
      .attr(
        'y',
        (d) =>
          yScale(
            new Date(
              dayjs(dia).format('MM/DD/YYYY').toString() +
                ' ' +
                ObtenerHoraIniDetalleDia(d)
            )
          ) + barStyle.startPadding
      )
      .attr('height', (d) => {
        const startPoint = yScale(
          new Date(
            dayjs(dia).format('MM/DD/YYYY').toString() + ' ' + ObtenerHoraIniDetalleDia(d)
          )
        );
        const endPoint = yScale(
          new Date(
            dayjs(dia).format('MM/DD/YYYY').toString() + ' ' + ObtenerHoraFinDetalleDia(d)
          )
        );
        return Math.abs(
          endPoint - startPoint - (barStyle.endPadding - barStyle.startPadding)
        );
      })
      .attr('width', barStyle.width)
      .attr('rx', barStyle.radius)
      .on("click", (d,i) => {
        // console.log(d);
        // console.log(i);
        //console.log(d3.event);
        //setActividadSeleccionada(i);setMostrarModalActividad(true)
        window.location.href = `../../FlujodeTrabajo/Formularios/frmCrearActividades.aspx?Formulario=frmCreaActividades&ID=${i.FLUJOTRABAJOID}`
              
    })

    // const currentTimeDate = new Date(
      

    //   new Date(new Date().setDate(21)).setMonth(6)
    // ).setFullYear(Date.getFullYear());

    barGroups
      .append('rect')
      .attr('fill', nowColor)
      .attr('x', margin.left)
      .attr('y', yScale(timestamp) + barStyle.startPadding)
      .attr('height', 2)
      .attr('width', barStyle.width)
      
     

    barGroups
      .append('text')
      .attr('font-family', 'Roboto')
      .attr('font-size', 12)
      .attr('font-weight', 500)
      .attr('text-anchor', 'start')
      .attr('fill', barStyle.textColor)
      .attr('x', margin.left + 10)
      .attr(
        'y',
        (d) =>
          yScale(
            new Date(
              dayjs(dia).format('MM/DD/YYYY').toString() +
                ' ' +
                ObtenerHoraIniDetalleDia(d)
            )
          ) + 20
      )
      .text((d) => ` ${ObtenerHora(d)} \n  ${d.ASUNTO} \n ${d.FLUJOTRABAJOID}`)
      .attr('class', 'extraClass')
      // .text((d) => ObtenerHora(d))
      // .text((d) => d.FLUJOTRABAJOID);
      

               svg.append('text')
              .attr('class', 'title')
              .attr('x',250)
              .attr('y', 20)
              .attr('text-anchor', 'middle')
              .text(Recortar(ObtenerUsuario(idUsuario).nombre,20) )
              
              let defs = svg.append("defs").attr("id", "imgdefs")
              let catpattern = defs.append("pattern")
                        .attr("id", idUsuario)
                        .attr("height", 1)
                        .attr("width", 1)
                        .attr("x", "0")
                        .attr("y", "0")

                        catpattern.append("image")
          .attr("x", 0)
          .attr("y", 0)
          .attr("height", 35)
          .attr("width", 30)
          .attr("xlink:href", ObtenerUsuario(idUsuario).rutaFoto ? `../../Temporal/FotosTerce/${ObtenerUsuario(idUsuario).rutaFoto}` : '../../App_Themes/AzulCielo/Imagenes/user.png')
     svg.append("circle")
     .attr("r", 15)
     .attr("cy", 15)
     .attr("cx", 350)
     .attr("fill",`url(#${idUsuario})`)
              // svg.append('image')
              // .attr('xlink:href', ObtenerUsuario(idUsuario).rutaFoto ? `../../Temporal/FotosTerce/${ObtenerUsuario(idUsuario).rutaFoto}` : '../../App_Themes/AzulCielo/Imagenes/user.png')
              // .attr("x", 350)
              // .attr("class", 'imgUsuario')

  }, [actividades]);

  return (
    // <div>
    //   <div> {ObtenerNombreUsuario(idUsuario)} </div>
    //      {actividades.map((act, idx) => (
    //   <div
    //     className={`${ObtenerClaseColor(
    //       act
    //     )} text-gray-600 text-sm rounded truncate p-0 m-0`}
    //     key={idx}
    //     onClick={() => {
    //       setMostrarModalActividad(true);
    //       setActividadSeleccionada(act);
    //     }}
    //   >
    //     <div
    //       className={`h-3 w-3 ${ObtenerColorUsuario(
    //         act
    //       )} rounded-full inline-block`}
    //     ></div>
    //     <span className='text-xs'>{ObtenerHora(act)}</span>
    //     <span className='text-xs rounded truncate p-0 m-0'>
    //       {' ' + act.ASUNTO}
    //     </span>
    //   </div>
    // ))}
    // </div>
    <div className='grid grid-flow-col auto-cols-max testChart' id=''>
      
      {/* <div> {ObtenerNombreUsuario(idUsuario)} </div>
      {times.map(time => (
        <div>
          {actividades.map((act, idx) => (
            //  <span className='text-xs'>
            //    {console.log(  ObtenerHora(act) === time  )}
            //    {ObtenerHora(act)}
            //  </span>

            ObtenerHora(act) === time ?
              <div
                className={`${ObtenerClaseColor(
                  act
                )} text-gray-600 text-sm rounded truncate p-0 m-0`}
                key={idx}
                onClick={() => {
                  setMostrarModalActividad(true);
                  setActividadSeleccionada(act);
                }}
              >
                <div
                  className={`h-3 w-3 ${ObtenerColorUsuario(
                    act
                  )} rounded-full inline-block`}
                ></div>
                <span className='text-xs'>{ObtenerHora(act)}</span>
                <span className='text-xs rounded truncate p-0 m-0'>
                  {' ' + act.ASUNTO}
                </span>
              </div>
              : ''
          ))}
        </div>
      ))} */}
      <svg ref={ref} />
    </div>
  );
};

export default DiaUsuario;
