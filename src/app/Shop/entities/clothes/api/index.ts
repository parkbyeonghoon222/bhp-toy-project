import { apiInstance } from "../../../shared";
import { AxiosPromise } from "axios";
import { Cloth } from "../model";

const BASE_URL = "/clothes";

export type GetClothesParams = {
  sortDesc?: "ASC" | "DESC";
  sortColumn?: "year";
};

export const getClothes = (
  params?: GetClothesParams,
): AxiosPromise<Cloth[]> => {
  return apiInstance.get(BASE_URL, { params });
};
