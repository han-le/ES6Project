import { API_URL } from "./../config/index.js";

//Ham chung cho API
const callAPI = (uri, method = "GET", data) => {
  return axios({
    url: API_URL + uri,
    method, //(method: method)
    data, //(data: data)
  });
};

let urlAPI = "https://5f64b910fb1b5700169c92d2.mockapi.io/SanPham";

const getListProductSerVice = () => {
  return axios({
    url: urlAPI,
    method: "GET",
  });
};

const getItemFromAPIbyID = (itemID) => {
  return axios({
    url: `https://5f64b910fb1b5700169c92d2.mockapi.io/SanPham/${itemID}`,
    method: "GET",
  });
};

const removeItemFromAPI = (itemID) => {
  return axios({
    url: `https://5f64b910fb1b5700169c92d2.mockapi.io/SanPham/${itemID}`,
    method: "DELETE",
  });
};

const addItemToAPI = (item) => {
  return axios({
    url: urlAPI,
    method: "POST",
    data: item,
  });
};

const updateInformationOfAPI = (item) => {
  return axios({
    url: `https://5f64b910fb1b5700169c92d2.mockapi.io/SanPham/${item.id}`,
    method: "PUT",
    data: item,
  });
};

export {
  getListProductSerVice,
  removeItemFromAPI,
  addItemToAPI,
  getItemFromAPIbyID,
  updateInformationOfAPI,
  callAPI,
};
