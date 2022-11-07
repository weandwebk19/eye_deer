import { useSelector } from "react-redux";
import { createAxios } from "../createInstance";

const useAuth = () => {
    const user = useSelector((state) => state.auth.login.currentUser);
    const accessToken = user?.accessToken;
    const id = user?._id;
    let axiosJWT = createAxios(user);

    axiosJWT.post(
        "auth",
        id,
        {
            headers: { token: `Bearer ${accessToken}` },
        })
    .then(res => {
        if(res.status === 200) return true;
        else return false;
    })
    .catch (err=> {
        return false;
    })
}

export default useAuth;