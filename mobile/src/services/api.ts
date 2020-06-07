import axios from "axios";
import { UfIbge, CityIbge } from "../interfaces";

const api = axios.create({
  baseURL: "http://192.168.1.102:9000",
});

const apiIbge = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

api.interceptors.request.use(
  function (config) {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);

apiIbge.interceptors.request.use(
  function (config) {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

apiIbge.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export const getUfs = () => apiIbge.get<UfIbge[]>(`/estados`);
export const getCities = (uf: string) =>
  apiIbge.get<CityIbge[]>(`/estados/${uf}/municipios`);

export const getItems = () => api.get(`/items`);
export const getPoints = (params: any) => api.get(`/points`, { params });
export const getPoint = (id: number) => api.get(`/points/${id}`);

export const postCreatePoint = (formData: any) => api.post(`/points`, formData);

const endpoints = {
  getUfs,
  getCities,
  getItems,
  postCreatePoint,
  getPoints,
  getPoint,
};

export default endpoints;
