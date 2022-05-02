import { useQuery } from 'react-query';
import axios from 'axios';

export const fetchUsuario = () =>
  axios
    .get(
      //'frmCalendarioV2.aspx/ObtenerUsuario',
      'http://localhost:3003/usua'
    )
    .then((res) => res.data);

export default function useUsuario() {
  return useQuery(['usuario'], fetchUsuario);
}
