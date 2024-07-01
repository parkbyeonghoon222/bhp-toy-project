import { publicProcedure, router } from "../../../../server/db";
import { z } from "zod";
import { getCartsBySessionId } from "./get";
import { createCart } from "./post";
import { deleteCart } from "./delete";

export const cartApiRouter = router({
  getCartsBySessionId: publicProcedure.input(z.string()).query(async (opts) => {
    return await getCartsBySessionId(opts.input);
  }),
  createCart: publicProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const cart = await createCart({
        session_id: ctx.req.session.sessionId,
        cloth_id: input,
      });
      ctx.req.carts = ctx.req.session.sessionId
        ? await getCartsBySessionId(ctx.req.session.sessionId)
        : [];
      console.log(ctx.req.carts);
      return cart;
    }),
  deleteCart: publicProcedure.input(z.number()).mutation(async (opts) => {
    return await deleteCart(opts.input);
  }),
});
