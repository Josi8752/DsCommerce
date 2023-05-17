import axios, { AxiosRequestConfig } from "axios";
import { Base_URL } from "../utils/system";




export function findPageRequest(page: number, name: string, size = 12, sort = 'name') {
    const config: AxiosRequestConfig = {
        
        method: 'GET',
        baseURL: Base_URL,
        url: '/products',
        params: {
            page,
            name,
            size,
            sort

        }
    }
    return axios(config)
}

export function findById(id: number) {
    return axios.get(`${Base_URL}/products/ ${id}`);
}

