import { loginSuccess } from "redux/authSlice";
import {createAxiosJWT} from "./createInstance";

//get user info
export const getUserByUsername = async(user, dispatch) => {
    try{
        const axios = createAxiosJWT(user, dispatch, loginSuccess);
        const accessToken = user?.accessToken;
        const username = user?.user.username;

        const res = await axios.get(`/user/profile/${username}`, {
            headers: { token: `Bearer ${accessToken}` },
        });
        if(res.status === 200){
            return res.data;
        }

        return res;
    }
    catch(error){
        console.log(error);
        return error;
    }
}
//update profile user
export const updateProfileUser = async (user, userInfo, dispatch) => {
    const axios = createAxiosJWT(user, dispatch, loginSuccess);
    const accessToken = user?.accessToken;
    const username = user?.user.username;
    try {
        const formData = new FormData();

        //append data
        for(let key in userInfo){
            formData.append(key, userInfo[key]);
        }

        const res = await axios({
            method: "post",
            url: `/user/profile/${username}`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                token: `Bearer ${accessToken}`
            },
        });

        if(res.status === 200){
            return res.data;
        }
        return res;
    } catch(error) {
      console.log(error);
      return error.response.data;
    }
}

//get list owned group
export const getOwnedGroups = async (user, dispatch) => {
    const axios = createAxiosJWT(user, dispatch, loginSuccess);
    const accessToken = user?.accessToken;
    const id = user?.user.id;

    const res = await axios.get(`/group/owned?userId=${id}`, {
        headers: { token: `Bearer ${accessToken}` },
    })
    .catch(error => {
        console.log(error);
        return error;
    });
    if(res.status === 200){
        return res.data;
    }

    return [];
}

//get list joined group
export const getJoinedGroups = async (user, dispatch) => {
    const axios = createAxiosJWT(user, dispatch, loginSuccess);
    const accessToken = user?.accessToken;
    const id = user?.user.id;

    const res = await axios.get(`/group/joined?userId=${id}`, {
        headers: { token: `Bearer ${accessToken}` },
    })
    .catch(error => {
        console.log(error);
        return error;
    });
    if(res.status === 200){
        return res.data;
    }

    return [];
}

export const createGroup = async (user, dispatch, groupInfo) => {
    const axios = createAxiosJWT(user, dispatch, loginSuccess);
    const accessToken = user?.accessToken;
    const userId = user?.user.id;
    try {
        const formData = new FormData();

        //append data
        for(let key in groupInfo){
            formData.append(key, groupInfo[key]);
        }

        //append user id
        formData.append("userId", userId);

        console.log(groupInfo, userId);
        const res = await axios({
            method: "post",
            url: `/group/create`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                token: `Bearer ${accessToken}`
            },
        });

        if(res.status === 200){
            return res.data;
        }
        return res;
    } catch(error) {
      console.log(error);
      return error.response.data;
    }
}