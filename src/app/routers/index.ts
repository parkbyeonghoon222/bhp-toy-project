import { createRouter } from "@rune-ts/server";
import { WordleRouter } from "./wordleRouter";
import { HomeRouter } from "./homeRouter";
import { ShopRouter } from "./shopRouter";
import { CartRouter } from "./cartRouter";
import "../../shared/common/style/reset.scss";

export type ClientRouter = typeof WordleRouter &
  typeof ShopRouter &
  typeof HomeRouter &
  typeof CartRouter;

export const ClientRouter = createRouter<ClientRouter>({
  ...WordleRouter,
  ...ShopRouter,
  ...HomeRouter,
  ...CartRouter,
});
