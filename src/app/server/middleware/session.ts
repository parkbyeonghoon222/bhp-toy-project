import { NextFunction, Request, Response } from "express";
import session from "express-session";
import { createSession } from "../../../entities/user/api/post";
import { getCartsBySessionId } from "../../../entities/cart/api/get";
import { v4 as uuidv4 } from "uuid";

export const sessionMiddleware = session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});

export const ensureGuestSession = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const sessionId = req.cookies.sessionId;
  const userId = req.cookies.userId;
  if (!req.path.includes("trpc") && !sessionId) {
    const sessionIdCookie = uuidv4();
    res.cookie("sessionId", sessionIdCookie, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });
    createSession({
      sessionId: sessionIdCookie,
    });
  }
  next();
};

export const ensureCartsBySessionId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.cookies.sessionId) {
    req.carts = await getCartsBySessionId(req.cookies.sessionId);
  }
  next();
};
