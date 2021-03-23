import axios, { AxiosRequestConfig, AxiosResponse, AxiosInstance } from "axios";

// export interface ApiInterface {
//   site?: string
//   baseURL: string
// }

class Api {
  baseURL: string;
  constructor() {
    this.baseURL = "http://localhost:3000";
  }

  configInterceptors(instance: AxiosInstance, url?: string) {
    instance.interceptors.request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        console.log("config", config);
        const token = localStorage.getItem("token");
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }
    );
    instance.interceptors.response.use(
      (res: AxiosResponse) => {
        console.log("+++++", res);
        return res.data;
      },
      (error: any) => {
        if (error.response.status === 401) {
          localStorage.setItem("isLogin", "false");
          window.location.href = "/login";
        }
        console.log("=-=-=-", error.response.status);
      }
    );
  }
  request(config: AxiosRequestConfig) {
    const instance = axios.create();
    this.configInterceptors(instance);
    return instance({ ...config, baseURL: this.baseURL });
  }
  get(config: AxiosRequestConfig | string) {
    if (typeof config === "string") {
      return this.request({
        url: config,
        method: "GET",
      });
    } else {
      return this.request({
        ...config,
        method: "GET",
      });
    }
  }
  post(config: AxiosRequestConfig) {
    return this.request({
      ...config,
      method: "POST",
    });
  }
}

export default new Api();
