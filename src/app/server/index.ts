import { app, type LayoutData, MetaView } from "@rune-ts/server";
import { ClientRouter } from "../ClientRouter";
import {
  getClothes,
  getClothesCount,
  GetClothesParams,
} from "../../entities/clothes/api";

const server = app();

server.get(ClientRouter["/shop"].toString(), async function (req, res) {
  const queryData = req.query as unknown as GetClothesParams;
  const resultData = await Promise.all([
    getClothes(queryData),
    getClothesCount(queryData),
  ]).then((res) => {
    const clothes = res[0].data;
    const count = res[1].data;
    return { clothes, count };
  });

  const layoutData: LayoutData = {
    html: {
      is_mobile: "false",
    },
    body: {
      scripts: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/dialog-polyfill/0.5.6/dialog-polyfill.min.js",
        },
      ],
    },
    head: {
      title: "Shop",
      description: "크리에이터를 위한 ~ 굿즈.",
      link_tags: [
        { href: "https://unpkg.com/sanitize.css", rel: "stylesheet" },
        { href: "https://fonts.googleapis.com", rel: "preconnect" },
        { href: "https://fonts.gstatic.com", rel: "preconnect" },
        {
          href: "https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  };

  res.locals.layoutData = layoutData;

  res.send(
    new MetaView(
      ClientRouter["/shop"](
        { clothes: resultData.clothes, count: Number(resultData.count) },
        { is_mobile: true },
      ),
      res.locals.layoutData,
    ).toHtml(),
  );
});
server.get(ClientRouter["/wordle"].toString(), function (req, res) {
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
      ClientRouter["/wordle"]({}, { is_mobile: true }),
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

  res.send(
    new MetaView(
      ClientRouter["/"]({}, { is_mobile: true }),
      res.locals.layoutData,
    ).toHtml(),
  );
});
