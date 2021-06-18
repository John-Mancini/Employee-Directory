import axios from "axios";

export default {
  getEmp: () => {
    return axios.get("https://randomuser.me/api/?results=25");
  },
};
