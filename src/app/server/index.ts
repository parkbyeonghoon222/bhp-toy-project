import { app, type LayoutData, MetaView } from "@rune-ts/server";
import { ClientRouter } from "../routers";
import { createContext } from "../../../server/db";
import * as trpcExpress from "@trpc/server/adapters/express";
import { client } from "../../shared";
import { apiRouters } from "../../../server";

const server = app();

server.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: apiRouters,
    createContext,
  }),
);

const defaultLinks = [
  { href: "https://unpkg.com/sanitize.css", rel: "stylesheet" },
  { href: "https://fonts.googleapis.com", rel: "preconnect" },
  { href: "https://fonts.gstatic.com", rel: "preconnect" },
  {
    href: "https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
    rel: "stylesheet",
  },
];

server.get(ClientRouter["/shop/:id"].toString(), async function (req, res) {
  const { id } = req.params as { id: string };
  const cloth = await client.getCloth.query(Number(id));

  const layoutData: LayoutData = {
    html: {
      is_mobile: "false",
    },
    head: {
      title: "Shop",
      description: "크리에이터를 위한 ~ 굿즈.",
      link_tags: defaultLinks,
    },
  };
  res.locals.layoutData = layoutData;

  res.send(
    new MetaView(
      ClientRouter["/shop/:id"]({ cloth }, { is_mobile: true }),
      res.locals.layoutData,
    ).toHtml(),
  );
});

server.get(ClientRouter["/shop"].toString(), async function (req, res) {
  const { page = 1, limit = 20, ...restParams } = req.query;

  const count = await client.getClothesCount.query(restParams);
  const clothes = await client.getClothes.query({
    page: parseInt(page),
    limit: parseInt(limit),
    ...restParams,
  });

  const layoutData: LayoutData = {
    html: {
      is_mobile: "false",
    },
    head: {
      title: "Shop",
      description: "크리에이터를 위한 ~ 굿즈.",
      link_tags: defaultLinks,
    },
  };

  res.locals.layoutData = layoutData;

  res.send(
    new MetaView(
      ClientRouter["/shop"]({ clothes, count }, { is_mobile: true }),
      res.locals.layoutData,
    ).toHtml(),
  );
});

server.get(ClientRouter["/wordle"].toString(), async function (req, res) {
  const targetWord = await client.getRandomWord.query();

  const layoutData: LayoutData = {
    html: {
      is_mobile: "false",
    },
    head: {
      title: "wordle",
      description: "박병훈의 wordle 게임입니다.",
    },
  };

  res.locals.layoutData = layoutData;

  res.send(
    new MetaView(
      ClientRouter["/wordle"]({ targetWord }, { is_mobile: true }),
      res.locals.layoutData,
    ).toHtml(),
  );
});

server.get(ClientRouter["/"].toString(), (req, res) => {
  const layoutData: LayoutData = {
    html: {
      is_mobile: "false",
    },
    head: {
      title: "wordle",
      description: "박병훈의 wordle 게임입니다.",
      link_tags: [
        { href: "https://unpkg.com/sanitize.css", rel: "stylesheet" },
      ],
    },
  };

  res.locals.layoutData = layoutData;

  res.send(new MetaView(ClientRouter["/"](), res.locals.layoutData).toHtml());
});
