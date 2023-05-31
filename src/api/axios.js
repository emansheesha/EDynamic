import axios from "axios";
const token = localStorage.getItem("accessToken");
export default axios.create({
  baseURL: "http://62.171.166.157:5050",
  headers: { Authorization: "Bearer " + token },
});
