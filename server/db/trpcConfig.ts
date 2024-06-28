import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { clothesApiRouter } from "../../src/entities/clothes/api";
import { wordleApiRouter } from "../../src/entities/wordle/api";

export const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = Awaited<ReturnType<typeof createContext>>;
export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;

export const apiRouters = mergeRouters(clothesApiRouter, wordleApiRouter);
export type ApiRouters = typeof apiRouters;
