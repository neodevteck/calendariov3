import create from 'zustand';
import dayjs from 'dayjs';

const useStore = create((set) => ({
  indiceMes: dayjs().locale('es').month(),
  setIndiceMes: (i) => set({ indiceMes: i }),
}));

export default useStore;
