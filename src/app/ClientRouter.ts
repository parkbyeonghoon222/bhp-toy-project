import { createRouter } from "@rune-ts/server";
import { HomeRouter, ShopRouter, WordleRouter } from "./routers";
import "../../common/style/reset.scss";

export type ClientRouter = typeof WordleRouter &
  typeof ShopRouter &
  typeof HomeRouter;

export const ClientRouter = createRouter<ClientRouter>({
  ...WordleRouter,
  ...ShopRouter,
  ...HomeRouter,
});
