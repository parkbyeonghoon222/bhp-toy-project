import { z } from "zod";

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

export const ClothesParamsSchema: z.ZodType<ClothesParams> = z.object({
  sortColumn: z.enum(["id", "year"]),
  limit: z.number(),
  skip: z.number(),
  masterCategory: z.union([
    z.string().optional(),
    z.string().array().optional(),
  ]),
  subCategory: z.union([z.string().optional(), z.string().array().optional()]),
  articleType: z.union([z.string().optional(), z.string().array().optional()]),
  search: z.string().optional(),
});

export const GetClothesParamsSchema: z.ZodType<GetClothesParams> = z.object({
  page: z.number(),
  limit: z.number(),
  sortColumn: z.enum(["id", "year"]).optional(),
  masterCategory: z.union([
    z.string().optional(),
    z.string().array().optional(),
  ]),
  subCategory: z.union([z.string().optional(), z.string().array().optional()]),
  articleType: z.union([z.string().optional(), z.string().array().optional()]),
  search: z.string().optional(),
});

export const GetClothesCountParamsSchema: z.ZodType<
  Pick<
    GetClothesParams,
    "masterCategory" | "subCategory" | "search" | "articleType"
  >
> = z.object({
  masterCategory: z.union([
    z.string().optional(),
    z.string().array().optional(),
  ]),
  subCategory: z.union([z.string().optional(), z.string().array().optional()]),
  articleType: z.union([z.string().optional(), z.string().array().optional()]),
  search: z.string().optional(),
});
