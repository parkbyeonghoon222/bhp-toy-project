import { publicProcedure, router } from "../../../../server/db/trpcConfig";
import { getCloth, getClothes, getClothesCount } from "./get";
import { GetClothesCountParamsSchema, GetClothesParamsSchema } from "../types";
import { z } from "zod";

export const clothesApiRouter = router({
  getClothes: publicProcedure
    .input(GetClothesParamsSchema)
    .query(async (opts) => {
      const { page, limit, sortColumn = "id", ...restParams } = opts.input;

      return await getClothes({
        skip: page * limit - limit,
        limit,
        sortColumn,
        ...restParams,
      });
    }),
  getClothesCount: publicProcedure
    .input(GetClothesCountParamsSchema)
    .query(async (opts) => {
      return await getClothesCount(opts.input);
    }),
  getCloth: publicProcedure.input(z.number()).query(async (opts) => {
    return await getCloth(opts.input);
  }),
});
