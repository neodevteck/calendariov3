import create from 'zustand';
import dayjs from 'dayjs';

const useStore = create((set) => ({
  indiceMes: dayjs().locale('es').month(),
  setIndiceMes: (val) => set({ indiceMes: val }),
  mesMiniCalendario: null,
  setMesMiniCalendario: (val) => set({ mesMiniCalendario: val }),
  diaSeleccionado: dayjs(),
  setDiaSeleccionado: (val) => set({ diaSeleccionado: val }),
}));

export default useStore;
