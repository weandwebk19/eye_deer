import { useQuery } from "react-query";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { requireLogin } from '../httpClient';

export const useLoadPage = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login.currentUser);
    const res = useQuery(["auth"], async () => {
        await requireLogin(user, navigate, dispatch);
        return props.children;
    }, {
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      staleTime: Infinity
  });

  return res;
}