import { createRouter } from "@rune-ts/server";
import { WordleRouter } from "./wordleRouter";
import { HomeRouter } from "./homeRouter";
import { ShopRouter } from "./shopRouter";
import "../../shared/common/style/reset.scss";

export type ClientRouter = typeof WordleRouter &
  typeof ShopRouter &
  typeof HomeRouter;

export const ClientRouter = createRouter<ClientRouter>({
  ...WordleRouter,
  ...ShopRouter,
  ...HomeRouter,
});
