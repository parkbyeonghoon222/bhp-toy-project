export interface Cloth {
  id: number;
  gender: string;
  masterCategory: string;
  subCategory: string;
  articleType: string;
  baseColour: string;
  season: string;
  year: number;
  usage: string;
  productDisplayName: string;
  imageUrl: string;
}

export interface ClothesParams {
  sortColumn: "id" | "year";
  limit: number;
  skip: number;
  masterCategory?: string | string[];
  subCategory?: string | string[];
  articleType?: string | string[];
  search?: string;
}

export interface GetClothesParams
  extends Omit<ClothesParams, "sortColumn" | "skip"> {
  page: number;
  sortColumn?: "id" | "year";
}
