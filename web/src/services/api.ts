import axios from "axios";
import { addLoading, removeLoading } from "../helpers";
import { UfIbge, CityIbge } from "../interfaces";

const api = axios.create({
  baseURL: "http://localhost:9000",
});

const apiIbge = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

api.interceptors.request.use(
  function (config) {
    addLoading();
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  function (response) {
    removeLoading();
    return response;
  },
  function (err) {
    removeLoading();
    return Promise.reject(err);
  }
);

apiIbge.interceptors.request.use(
  function (config) {
    addLoading();
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

apiIbge.interceptors.response.use(
  function (response) {
    removeLoading();
    return response;
  },
  function (err) {
    removeLoading();
    return Promise.reject(err);
  }
);

export const getUfs = () => apiIbge.get<UfIbge[]>(`/estados`);
export const getCities = (uf: string) =>
  apiIbge.get<CityIbge[]>(`/estados/${uf}/municipios`);

export const getItems = () => api.get(`/items`);

export const postCreatePoint = (formData: any) => api.post(`/points`, formData);

const endpoints = {
  getUfs,
  getCities,
  getItems,
  postCreatePoint,
};

export default endpoints;
