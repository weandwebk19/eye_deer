import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { createAxios } from "../createInstance";
import { isLoggedIn } from '../services/AuthService';
import { useQuery } from "react-query";

const PrivateRoute = () => {
    const [page, setPage] = useState();
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const id = user?.user.id;
    const navigate = useNavigate();
    let axiosJWT = createAxios(user);

    /** Dung xoa cmt nay */

    // const useLoadData = () => {
    //     return useQuery(["auth"], async () => {
    //       const res  = await isLoggedIn(id, navigate, accessToken, axiosJWT);
    //       //console.log(res);
    //       const data = res;
    //       console.log("data1", data);
    //       if(data && data.status === 200) {
    //         setPage(<Outlet />);
    //       }
    //       else {
    //         setPage(<Navigate to="/login" />);
    //       }
    //       return data;
    //     });
    //   };
    // const { isLoading, error, data, isFetching } = useLoadData();

    // if (isLoading) return "Loading...";
    // if (error) return "An error has occurred: " + error.message;

    useEffect(() => {
        isLoggedIn(id, navigate, accessToken, axiosJWT)
        .then(res => {
            if(res.status === 200) {
                setPage(<Outlet />)
            }
            else {
                setPage(<Navigate to="/login" />)
            }
        })
    }, []);

    //console.log(page);
    return page;
}

export default PrivateRoute;