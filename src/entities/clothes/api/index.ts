import { apiInstance } from "../../../shared";
import { AxiosPromise } from "axios";
import { Cloth } from "../types";

const BASE_URL = "/api/clothes";

export type GetClothesParams = {
  page: number;
  limit: number;
  sortColumn?: "id" | "year";
  masterCategory?: string;
  subCategory?: string | string[];
  articleType?: string | string[];
  search?: string;
};

export const getClothes = ({
  page = 1,
  limit = 20,
  articleType,
  subCategory,
  masterCategory,
  sortColumn,
  search,
}: GetClothesParams): AxiosPromise<Cloth[]> => {
  return apiInstance.get(BASE_URL, {
    params: {
      limit,
      skip: page * limit - limit,
      articleType,
      subCategory,
      sortColumn,
      masterCategory,
      search,
    },
  });
};

export const getClothesCount = ({
  articleType,
  subCategory,
  masterCategory,
  sortColumn,
  search,
}: GetClothesParams): AxiosPromise<string> => {
  return apiInstance.get(BASE_URL + "/count", {
    params: {
      articleType,
      subCategory,
      sortColumn,
      masterCategory,
      search,
    },
  });
};

export const getCloth = (id: number): AxiosPromise<Cloth> => {
  return apiInstance.get(BASE_URL + `/${id}`, { params: { id } });
};
