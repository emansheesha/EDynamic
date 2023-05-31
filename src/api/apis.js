import axios from "../api/axios";
const verify_url = "/api/token/verify/";
const refresh_url = "/api/token/refresh/";
const table_Url = "/api/contact/";
const accessToken = localStorage.getItem("accessToken");
const refreshToken = localStorage.getItem("refreshToken");
// get Table Data from api
export const getTableData = async (page) => {
  CheckAccessToken();
  const response = await axios.get(`${table_Url}?page=${page}`);
  const table_response = response?.data;
  // console.log(table_response);
  return table_response;
};
// delete row from Table Data
export const deleteTableData = async (id) => {
  CheckAccessToken();
  const response = await axios.delete(`${table_Url}${id}`);
  const table_response = response;
  // console.log(table_response);
  return table_response;
};
// create row in Table Data
export const createTableData = async (data) => {
  CheckAccessToken();
  const response = await axios.post(`${table_Url}`, data);
  const table_response = response;
  // console.log(table_response);
  return table_response;
};
// edit row from Table Data
export const EditTableData = async (data, id) => {
  CheckAccessToken();
  const response = await axios.put(`${table_Url}${id}/`, data);
  const table_response = response;
  // console.log(table_response);
  return table_response;
};
// search in table by first name, last name or email
export const SearchTableData = async (searchValue, searchSelect) => {
  CheckAccessToken();
  const response = await axios.get(
    `${table_Url}?${searchSelect}=${searchValue}`
  );
  // console.log(response);
  return response.data.results;
};
export const CheckAccessToken = async () => {
  const response = await axios.post(verify_url, { token: accessToken });
  if (response?.data?.access)
    return localStorage.setItem("accessToken", response?.data?.access);
  else return CheckRefreshToken();
};
export const CheckRefreshToken = async () => {
  const response = await axios.post(refresh_url, { refresh: refreshToken });
  // console.log("response", response?.data?.access);

  return localStorage.setItem("accessToken", response?.data?.access);
};
