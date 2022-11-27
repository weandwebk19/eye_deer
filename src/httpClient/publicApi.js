import { createAxiosDefault } from "./createInstance";

const axios = createAxiosDefault();

export const getRoles = async () => {
  const res = await axios.get("roles").catch((err) => {
    console.log(err);
    return [];
  });
  if (res.status === 200) {
    return res.data;
  }
  return [];
};

export const getWorkplaces = async () => {
  const res = await axios.get("workplaces").catch((err) => {
    console.log(err);
    return [];
  });
  if (res.status === 200) {
    return res.data;
  }
  return [];
};
