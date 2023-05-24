import axios, { AxiosRequestConfig } from "axios";
import { Base_URL } from "./system";

export function requestBackend(config: AxiosRequestConfig){

    return axios({...config, baseURL: Base_URL});

}