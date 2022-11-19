import { createAxiosJWT } from "./createInstance";
const axios = createAxiosJWT();

export const getMyGroup = async () => {
  const res = await axios.get("https://dummyjson.com/products").catch((err) => {
    console.log(err);
    return [];
  });
  if (res.status === 200) {
    return res.data;
  } else return [];
};
