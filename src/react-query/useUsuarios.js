import { useQuery } from 'react-query';
import axios from 'axios';

export const fetchUsuarios = () =>
  axios
    .get(
      //'frmCalendarioV2.aspx/ObtenerUsuario'
      'http://localhost:3003/usuarios'
    )
    .then((res) => res.data);

export default function useUsuarios() {
  return useQuery(['usuarios'], fetchUsuarios);
}
