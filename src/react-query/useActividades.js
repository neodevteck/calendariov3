import { useQuery } from 'react-query'
import axios from 'axios'

export const fetchActividades = (FechaInicial,FechaFinal,ArrIds) =>
// axios.get('http://localhost:3003/actividades',
//      //axios.post('frmCalendarioV2.aspx/ObtenerActividadesxTerceIdxFechaInixFechaFin',
//       //{FechaInicial:FechaInicial,FechaFinal:FechaFinal,ArrIds: ArrIds ? ArrIds : []}, 
//       {headers: { 'Content-Type': 'application/json' }
//      }).then((res) => res.data)
axios
    .get(
      //'frmCalendarioV2.aspx/ObtenerUsuario',
      'http://localhost:3003/actividades'
    )
    .then((res) => res.data);

export default function useActividades(FechaInicial,FechaFinal,ArrIds) {
  return useQuery(['actividades'],() => fetchActividades(FechaInicial,FechaFinal,ArrIds))
}

