import { useQuery } from "react-query";
import { getRoles } from "../httpClient";

export const useGetRoles = () => {
  try {
    const res = useQuery(
      ["role"],
      async () => {
        const data = await getRoles();
        return data;
      },
      {
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      }
    );

    return res;
  } catch (err) {
    return err;
  }
};
