import axios from "axios";
import { Base_URL } from "../utils/system";

export function findAll() {
    return axios.get(`${Base_URL}/products?size=12`);
}

export function findById(id: number) {
    return axios.get(`${Base_URL}/products/ ${id}`);
}

