import { useQuery } from "react-query";
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { requireLogin } from '../httpClient';

export const useLoadPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const res = useQuery(["auth"], async () => {
        await requireLogin(user, navigate, dispatch);
        return <Outlet />;
    }, {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity
  });

  return res;
}