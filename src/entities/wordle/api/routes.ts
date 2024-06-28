import { publicProcedure, router } from "../../../../server/db";
import { getRandomWord } from "./get";

export const wordleApiRouter = router({
  getRandomWord: publicProcedure.query(async (opts) => {
    return await getRandomWord();
  }),
});
