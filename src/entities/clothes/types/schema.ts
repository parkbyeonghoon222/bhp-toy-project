import { z } from "zod";
import { GetClothesParams } from "./typings";

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
