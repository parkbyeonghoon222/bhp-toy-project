import { apiInstance } from "../../../shared";
import { AxiosPromise } from "axios";
import { Cloth } from "../types";

const BASE_URL = "/api/clothes";

export type GetClothesParams = {
  page: number;
  limit: number;
  sortColumn?: "id" | "year";
  masterCategory?: string;
  subCategory?: string;
  articleType?: string;
};

export const getClothes = ({
  page = 1,
  limit = 20,
  articleType,
  subCategory,
  masterCategory,
  sortColumn,
}: GetClothesParams): AxiosPromise<Cloth[]> => {
  return apiInstance.get(BASE_URL, {
    params: {
      limit,
      skip: page * limit - limit,
      articleType,
      subCategory,
      sortColumn,
      masterCategory,
    },
  });
};

export const getClothesCount = ({
  subCategory,
  masterCategory,
  sortColumn,
}: GetClothesParams): AxiosPromise<string> => {
  return apiInstance.get(BASE_URL + "/count", {
    params: {
      subCategory,
      sortColumn,
      masterCategory,
    },
  });
};
