import { NextFunction, Request, Response } from "express";
import session from "express-session";
import { createSession } from "../../../entities/user/api/post";
import { getCartsBySessionId } from "../../../entities/cart/api/get";

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
  if (!req.session.sessionId) {
    req.session.sessionId = `guest_${Date.now()}`;
    await createSession({
      sessionId: req.session.sessionId,
    });
  }
  next();
};

export const ensureCartsBySessionId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.session.sessionId) {
    req.carts = await getCartsBySessionId(req.session.sessionId);
  }
  next();
};
