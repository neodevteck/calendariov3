import { useQuery } from 'react-query';
import axios from 'axios';

export const fetchActividades = () =>
  axios
    .get(
      //'frmCalendarioV2.aspx/ObtenerUsuario',
      //'http://localhost:3001/actividades',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    )
    .then((res) => res.data);

export default function useActividades() {
  return useQuery(['actividades'], fetchActividades);
}
