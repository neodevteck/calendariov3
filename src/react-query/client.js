import { QueryClient } from 'react-query';
const client = new QueryClient({
    defaultOptions:{
        queries:{
            staleTime: Infinity //1000 * 20
        }
    }
});

export default client;
