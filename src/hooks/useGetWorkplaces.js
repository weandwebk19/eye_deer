import { useQuery } from "react-query";

import WorkplaceService from "services/workplacesService";

export const useGetWorkplaces = () => {
  const res = useQuery(
    ["workplace"],
    async () => {
      const data = await WorkplaceService.getWorkplaces();
      return data;
    },
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  return res;
};
