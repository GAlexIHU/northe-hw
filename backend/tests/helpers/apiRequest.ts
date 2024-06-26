import axios, { AxiosError } from "axios";
import config from "../../src/config";

type RequestPayload = {
  url: string;
  method: string;
  queryParams?: object | null;
  body?: object | null;
};

const serverUrl = `http://${config.host === "0.0.0.0" ? "127.0.0.1" : config.host}:${config.port}/api/`;

function apiRequest({
  url,
  method,
  queryParams = null,
  body = null,
}: RequestPayload) {
  return axios({
    method,
    url: serverUrl + url,
    params: queryParams,
    data: body,
  }).catch((e) => (e as AxiosError).response);
}

export default apiRequest;
