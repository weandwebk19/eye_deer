import { createAxiosDefault } from "./api";

const axios = createAxiosDefault();

// get getWorkplaces
const getWorkplaces = async () => {
  try {
    const res = await axios.get("workplaces");
    if (res.status === 200) {
      return res.data;
    }

    return [];
  } catch (error) {
    console.log(error);
    return error;
  }
};

const WorkplaceService = {
  getWorkplaces,
};

export default WorkplaceService;
