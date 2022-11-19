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
        return [];
    } catch(error) {
      console.log(error);
      return error.response.data;
    }
}

export const getMyGroup = async () => {
    //const axios = createAxiosDefault();
    const axios = require('axios');
  const res = await axios.get("https://dummyjson.com/products").catch((err) => {
    console.log(err);
    return [];
  });
  if (res.status === 200) {
    return res.data;
  } else return [];
};
