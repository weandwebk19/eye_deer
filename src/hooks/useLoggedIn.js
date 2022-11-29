import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { requireLogin } from "../httpClient";

export const useLoggedIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const res = useQuery(
    ["auth"],
    async () => {
      const res = await requireLogin(user, navigate, dispatch).catch((err) => {
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
