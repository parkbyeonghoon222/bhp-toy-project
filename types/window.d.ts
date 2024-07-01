import { ClientRouter } from "../src/app/routers";
import "express-session";
import { Cloth } from "../src/entities/clothes/types";

export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __rune_SSR_INITIAL_DATA__: any;
    __rune_SSR_INITIAL_PATH__: keyof ClientRouter;
  }

  namespace NodeJS {
    interface ProcessEnv {
      SESSION: string;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    sessionId: string;
    userId: number;
  }
}

declare global {
  namespace Express {
    interface Request {
      carts: Cloth[];
      cookies: {
        sessionId: string;
        userId: number;
      };
    }
  }
}
