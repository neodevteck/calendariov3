import create from 'zustand';
import dayjs from 'dayjs';

const useStore = create((set) => ({
  indiceMes: dayjs().locale('es').month(),
  setIndiceMes: (val) => set({ indiceMes: val }),
  mesMiniCalendario: null,
  setMesMiniCalendario: (val) => set({ mesMiniCalendario: val }),
  diaSeleccionado: dayjs(),
  setDiaSeleccionado: (val) => set({ diaSeleccionado: val }),
  mostrarModalDia: false,
  setMostrarModalDia: (val) => set({ mostrarModalDia: val }),
  idUsuarioLogueado: 0,
  setIdUsuarioLogueado: (val) => set({ idUsuarioLogueado: val }),
  usuarios: [],
  setUsuarios: (item) => {
    set((state) => ({ usuarios: [...state.usuarios, item] }));
  },
}));

export default useStore;
