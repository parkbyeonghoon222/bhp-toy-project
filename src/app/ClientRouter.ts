import { createRouter } from "@rune-ts/server";
import { WordleRouter } from "./Wordle";
import { ShopRouter } from "./Shop";
import "../../common/style/reset.scss";

export type ClientRouter = typeof WordleRouter & typeof ShopRouter;

export const ClientRouter = createRouter<ClientRouter>({
  ...WordleRouter,
  ...ShopRouter,
});
