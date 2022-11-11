import { useQuery } from "react-query";
import {getWorkplaces} from '../httpClient';

export const useGetWorkplaces = () => {
  const res = useQuery(["workplace"], async () => {
      const data  = await getWorkplaces();
      return data;
    }, {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity
  });

  return res;
}