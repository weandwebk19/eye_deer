import {createAxiosJWT, createAxiosDefault} from "./createInstance";
const axios = createAxiosJWT();

//get user info
export const getUserByUsername = async(username) => {
    try{
        const axios = createAxiosDefault();
        const res = await axios.get(`/user/profile/${username}`);
        if(res.status === 200){
            return res.data;
        }

        return [];
    }
    catch(error){
        console.log(error);
    }
}
//update profile user
export const updateProfileUser = async (username, userInfo) => {
    console.log(userInfo);
    try {
        const formData = new FormData();

        //append data
        for(let key in userInfo){
            formData.append(key, userInfo[key]);
        }

        const axios = createAxiosDefault();
        const res = await axios({
            method: "post",
            url: `/user/profile/${username}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
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
  const res = await axios.get("https://dummyjson.com/products").catch((err) => {
    console.log(err);
    return [];
  });
  if (res.status === 200) {
    return res.data;
  } else return [];
};
