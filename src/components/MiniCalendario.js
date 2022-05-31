import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import { getMonth } from '../util/util';

function MiniCalendario() {
  const [indiceMesMiniCalendario, setindiceMesMiniCalendario] = useState(
    dayjs().month()
  );
  const [mesActualMiniCalendario, setmesActualMiniCalendario] = useState(
    getMonth()
  );

  useEffect(() => {
    setmesActualMiniCalendario(getMonth(indiceMesMiniCalendario));
  }, [indiceMesMiniCalendario]);
  const {
    indiceMes,
    setMesMiniCalendario,
    diaSeleccionado,
    setDiaSeleccionado,
  } = useContext(GlobalContext);

  useEffect(() => {
    setindiceMesMiniCalendario(indiceMes);
  }, [indiceMes]);

  function handlePrevMonth() {
    setindiceMesMiniCalendario(indiceMesMiniCalendario - 1);
  }
  function handleNextMonth() {
    setindiceMesMiniCalendario(indiceMesMiniCalendario + 1);
  }
  function getDayClass(day) {
    const format = 'DD-MM-YY';
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = diaSeleccionado && diaSeleccionado.format(format);
    if (nowDay === currDay) {
      return 'bg-blue-500 rounded-full text-white';
    } else if (currDay === slcDay) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold';
    } else {
      return '';
    }
  }
  return (
    <div className='mt-9'>
      <header className='flex justify-between'>
        <p className='text-gray-500 font-bold'>
          {dayjs(new Date(dayjs().year(), indiceMesMiniCalendario)).format(
            'MMMM YYYY'
          )}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className='cursor-pointer text-gray-600 mx-2'>
              <i className='fa fa-angle-left' aria-hidden='true'></i>
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className='cursor-pointer text-gray-600 mx-2'>
              <i className='fa fa-angle-right' aria-hidden='true'></i>
            </span>
          </button>
        </div>
      </header>
      <div className='grid grid-cols-7 grid-rows-6'>
        {mesActualMiniCalendario[0].map((day, i) => (
          <span key={i} className='text-sm py-1 text-center'>
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {mesActualMiniCalendario.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMesMiniCalendario(indiceMesMiniCalendario);
                  setDiaSeleccionado(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}
              >
                <span className='text-sm'>{day.format('D')}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
export default MiniCalendario;
