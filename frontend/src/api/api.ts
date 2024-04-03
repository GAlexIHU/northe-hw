import axios, { AxiosResponse } from "axios";

export class BaseApi {
  apiUrl = process.env.API_URL ?? "http://localhost:3000/api";

  public get(url: string): Promise<AxiosResponse> {
    return axios.get(`${this.apiUrl}${url}`).catch((error) => error);
  }

  public post(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: { [key: string]: any },
  ): Promise<AxiosResponse> {
    return axios.post(`${this.apiUrl}${url}`, body);
  }

  public delete(url: string): Promise<AxiosResponse> {
    return axios.delete(`${this.apiUrl}${url}`);
  }
}

export const Api = new BaseApi();
