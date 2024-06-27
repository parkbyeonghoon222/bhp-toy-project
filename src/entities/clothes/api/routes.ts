import { publicProcedure, router } from "../../../app/server/db/trpcConfig";
import { getClothes, getClothesCount } from "./get";
import { ClothesParamsSchema } from "../types";

export const clothesApiRouter = router({
  getClothes: publicProcedure.input(ClothesParamsSchema).query(async (opts) => {
    return await getClothes(opts.input);
  }),
  getClothesCount: publicProcedure
    .input(ClothesParamsSchema)
    .query(async (opts) => {
      return await getClothesCount(opts.input);
    }),
});
