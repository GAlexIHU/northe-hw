import axios, { AxiosResponse } from 'axios'

export class BaseApi {
  apiUrl = 'http://localhost:3000/api'

  public get(url: string): Promise<AxiosResponse<any>> {
    return axios.get(`${this.apiUrl}${url}`).catch((error) => error)
  }

  public post(
    url: string,
    body: { [key: string]: any }
  ): Promise<AxiosResponse<any>> {
    return axios.post(`${this.apiUrl}${url}`, body)
  }

  public delete(url: string): Promise<AxiosResponse<any>> {
    return axios.delete(`${this.apiUrl}${url}`)
  }
}

export const Api = new BaseApi()
