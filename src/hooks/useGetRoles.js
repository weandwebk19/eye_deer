import { useQuery } from "react-query";
import {getRoles} from '../httpClient';

export const useGetRoles = () => {
  const res = useQuery(["role"], async () => {
      const data  = await getRoles();
      return data;
    }, {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity
  });

  return res;
}