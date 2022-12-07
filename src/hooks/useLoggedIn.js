import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import AuthService from "services/authService";

export const useLoggedIn = () => {
  const user = useSelector((state) => state.auth.user);
  const res = useQuery(
    ["auth"],
    async () => {
      const res = await AuthService.isLoggedIn().catch((err) => {
        return false;
      });
      if (res) return true;
      else return false;
    },
    {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: 300000,
    }
  );

  return res;
};
