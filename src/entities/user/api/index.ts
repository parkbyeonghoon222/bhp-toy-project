import { apiInstance } from "../../../shared";
import { AxiosPromise } from "axios";
import { User } from "../types";

const BASE_URL = "/api/auth";

export const login = ({ email, password }: User): AxiosPromise<User[]> => {
  return apiInstance.post(BASE_URL + "/login", { email, password });
};
