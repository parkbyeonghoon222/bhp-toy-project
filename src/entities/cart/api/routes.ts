import { publicProcedure, router } from "../../../../server/db";
import { z } from "zod";
import { getCartsBySessionId } from "./get";
import { createCart } from "./post";
import { deleteCart } from "./delete";

export const cartApiRouter = router({
  getCartsBySessionId: publicProcedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      const carts =
        ctx.req.cookies.sessionId || input
          ? await getCartsBySessionId(ctx.req.cookies.sessionId || input)
          : [];
      ctx.req.carts = carts;
      return carts;
    }),
  createCart: publicProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const cart = await createCart({
        session_id: ctx.req.cookies.sessionId,
        cloth_id: input,
      });
      ctx.req.carts = ctx.req.cookies.sessionId
        ? await getCartsBySessionId(ctx.req.cookies.sessionId)
        : [];
      return cart;
    }),
  deleteCart: publicProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const cart = await deleteCart(input);
      ctx.req.carts = ctx.req.cookies.sessionId
        ? await getCartsBySessionId(ctx.req.cookies.sessionId)
        : [];
      return cart;
    }),
});
