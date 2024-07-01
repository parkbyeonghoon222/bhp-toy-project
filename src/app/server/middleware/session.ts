import { NextFunction, Request, Response } from "express";
import session from "express-session";
import { createSession } from "../../../entities/user/api/post";

export const sessionMiddleware = session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

export const ensureGuestSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session.guestId) {
    req.session.guestId = `guest_${Date.now()}`;
    await createSession({
      sessionId: req.session.guestId,
    });
  }
  next();
};
