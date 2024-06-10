import axios from "axios";

export const API_URL = process.env.production
  ? // 추후 production을 넣어야 한다면 변경 필요
    "http://localhost:8080"
  : "http://localhost:8080";

export const apiInstance = axios.create({
  baseURL: API_URL,
});
