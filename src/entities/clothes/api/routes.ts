import { publicProcedure, router } from "../../../app/server/db/trpcConfig";
import { getClothes, getClothesCount } from "./get";
import { GetClothesCountParamsSchema, GetClothesParamsSchema } from "../types";

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
});
