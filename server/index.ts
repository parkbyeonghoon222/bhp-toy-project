import { clothesApiRouter } from "../src/entities/clothes/api";
import { wordleApiRouter } from "../src/entities/wordle/api";
import { cartApiRouter } from "../src/entities/cart/api";

import { mergeRouters } from "./db";

export const apiRouters = mergeRouters(
  clothesApiRouter,
  wordleApiRouter,
  cartApiRouter,
);
export type ApiRouters = typeof apiRouters;
