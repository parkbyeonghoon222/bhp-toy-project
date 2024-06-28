import { clothesApiRouter } from "../src/entities/clothes/api";
import { wordleApiRouter } from "../src/entities/wordle/api";
import { mergeRouters } from "./db";

export const apiRouters = mergeRouters(clothesApiRouter, wordleApiRouter);
export type ApiRouters = typeof apiRouters;
