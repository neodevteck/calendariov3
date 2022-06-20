import React, { useContext, useRef, useEffect } from 'react';
import GlobalContext from '../context/GlobalContext';
import { times } from '../util/util';
import * as d3 from 'd3';

const DiaUsuario = ({ dia, actividades, indice, idUsuario }) => {
  const {
    setActividadSeleccionada,
    ObtenerClaseColor,
    ObtenerColorUsuario,
    ObtenerHora,
    setMostrarModalDia,
    setMostrarModalActividad,
    ObtenerNombreUsuario,
  } = useContext(GlobalContext);

  console.log(actividades);

  const calendarEvents = [
    {
      timeFrom: '2020-11-11T05:00:00.000Z',
      timeTo: '2020-11-11T12:00:00.000Z',
      title: 'Sleep',
      background: '#616161',
    },
    {
      timeFrom: '2020-11-11T16:00:00.000Z',
      timeTo: '2020-11-11T17:30:00.000Z',
      title: 'Business meeting',
      background: '#33B779',
    },
    {
      timeFrom: '2020-11-12T00:00:00.000Z',
      timeTo: '2020-11-12T05:00:00.000Z',
      title: 'Wind down time',
      background: '#616161',
    },
  ];
  // Make an array of dates to use for our yScale later on
  const dates = [
    ...calendarEvents.map((d) => new Date(d.timeFrom)),
    ...calendarEvents.map((d) => new Date(d.timeTo)),
  ];

  const margin = { top: 30, right: 30, bottom: 30, left: 50 }; // Gives space for axes and other margins
  const height = 1500;
  const width = 900;
  const barWidth = 600;
  const nowColor = '#EA4335';
  const barStyle = {
    background: '#616161',
    textColor: 'white',
    width: barWidth,
    startPadding: 2,
    endPadding: 3,
    radius: 3,
  };

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
    // All further code additions will go just below this line

    // Actually add the element to the page
    let ele = document.querySelector('#testChart');
    ele.append(svg.node());
    const yScale = d3
      .scaleTime()
      .domain([d3.min(dates), d3.max(dates)])
      .range([margin.top, height - margin.bottom]);

    const yAxis = d3.axisLeft().ticks(24).scale(yScale);
    // We'll be using this svg variable throughout to append other elements to it
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .attr('opacity', 0.5)
      .call(yAxis);

    svg
      .selectAll('g.tick')
      .filter((d, i, ticks) => i === 0 || i === ticks.length - 1)
      .select('text')
      .text('12 AM');

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
      .data(calendarEvents)
      .join('g')
      .attr('class', 'barGroup');

    barGroups
      .append('rect')
      .attr('fill', (d) => d.background || barStyle.background)
      .attr('x', margin.left)
      .attr('y', (d) => yScale(new Date(d.timeFrom)) + barStyle.startPadding)
      .attr('height', (d) => {
        const startPoint = yScale(new Date(d.timeFrom));
        const endPoint = yScale(new Date(d.timeTo));
        return (
          endPoint - startPoint - barStyle.endPadding - barStyle.startPadding
        );
      })
      .attr('width', barStyle.width)
      .attr('rx', barStyle.radius);

    const currentTimeDate = new Date(
      new Date(new Date().setDate(11)).setMonth(10)
    ).setFullYear(2020);

    barGroups
      .append('rect')
      .attr('fill', nowColor)
      .attr('x', margin.left)
      .attr('y', yScale(currentTimeDate) + barStyle.startPadding)
      .attr('height', 2)
      .attr('width', barStyle.width);

    barGroups
      .append('text')
      .attr('font-family', 'Roboto')
      .attr('font-size', 12)
      .attr('font-weight', 500)
      .attr('text-anchor', 'start')
      .attr('fill', barStyle.textColor)
      .attr('x', margin.left + 10)
      .attr('y', (d) => yScale(new Date(d.timeFrom)) + 20)
      .text((d) => d.title);
  }, []);

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
    <div className='grid grid-flow-col auto-cols-max' id='testChart'>
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
