import { createRouter } from '@rune-ts/server';
import { TutorialRouter } from './Docs/Tutorial/Tutorial';
import { MeetupRouter } from './Meetup';
import { BannerRouter } from './Banner/router';
import { WordleRouter } from './Wordle';
// import { MeetupRouter } from './Lecture';

export type ClientRouter = typeof MeetupRouter & typeof BannerRouter & typeof TutorialRouter & typeof WordleRouter;

export const ClientRouter = createRouter<ClientRouter>({
  ...MeetupRouter,
  ...BannerRouter,
  ...TutorialRouter,
  ...WordleRouter
});
