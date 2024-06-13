import { apiInstance } from "../../../shared";
import { AxiosPromise } from "axios";
import { Cloth } from "../types";

const BASE_URL = "/api/clothes";

export type GetClothesParams = {
  order?: "ASC" | "DESC";
  sortColumn?: "year";
};

export const getClothes = (
  params?: GetClothesParams,
): AxiosPromise<Cloth[]> => {
  return apiInstance.get(BASE_URL, { params });
};
