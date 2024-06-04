import { app, type LayoutData, MetaView } from '@rune-ts/server';
import { ClientRouter } from '../app/ClientRouter';

const server = app();

server.get(ClientRouter['/tutorials'].toString(), function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: '밋업',
      description: '',
    },
  };

  res.locals.layoutData = layoutData;

  const html = new MetaView(
    ClientRouter['/tutorials']({}, { is_mobile: true }),
    res.locals.layoutData,
  ).toHtml();

  res.send(html);
});

server.get(ClientRouter['/tutorials2'].toString(), function (req, res) {
  const layoutData: LayoutData = {
    head: {
      title: '밋업',
      description: '',
    },
  };

  res.locals.layoutData = layoutData;

  const html = new MetaView(
    ClientRouter['/tutorials2']({}, { is_mobile: true }),
    res.locals.layoutData,
  ).toHtml();

  res.send(html);
});

server.get(ClientRouter['/banner'].toString(), function (req, res) {
  const layoutData: LayoutData = {
    html: {
      is_mobile: 'false',
    },
    head: {
      title: '배너 예시',
      description: '',
    },
  };

  res.locals.layoutData = layoutData;

  res.send(
    new MetaView(ClientRouter['/banner']({}, { is_mobile: true }), res.locals.layoutData).toHtml(),
  );
});

server.get(ClientRouter['/wordle'].toString(), function (req, res) {
  const layoutData: LayoutData = {
    html: {
      is_mobile: 'false',
    },
    head: {
      title: 'wordle',
      description: '박병훈의 wordle 게임입니다.',
    },
  };

  res.locals.layoutData = layoutData;

  res.send(
    new MetaView(ClientRouter['/wordle']({}, { is_mobile: true }), res.locals.layoutData).toHtml(),
  );
});

server.get('/', (req, res) => {
  const layoutData: LayoutData = {
    html: {
      is_mobile: 'false',
    },
    head: {
      title: 'wordle',
      description: '박병훈의 wordle 게임입니다.',
    },
  };

  res.locals.layoutData = layoutData;

  res.send(
      new MetaView(ClientRouter['/']({}, { is_mobile: true }), res.locals.layoutData).toHtml(),
  );
});
