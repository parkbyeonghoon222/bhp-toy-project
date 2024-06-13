import { IUser } from "../../src/entities/user/types/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
