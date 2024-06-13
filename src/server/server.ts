import { app, type LayoutData, MetaView } from "@rune-ts/server";
import { ClientRouter } from "../app/ClientRouter";

const server = app();

server.get(ClientRouter["/shop"].toString(), function (req, res) {
  const layoutData: LayoutData = {
    html: {
      is_mobile: "false",
    },
    head: {
      title: "Shop",
      description: "크리에이터를 위한 ~ 굿즈.",
      link_tags: [
        { href: "https://unpkg.com/sanitize.css", rel: "stylesheet" },
      ],
    },
  };

  res.locals.layoutData = layoutData;

  res.send(
    new MetaView(
      ClientRouter["/shop"]({}, { is_mobile: true }),
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
