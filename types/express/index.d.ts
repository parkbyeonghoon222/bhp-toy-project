import { IUser } from "../../src/entities/user/model/userModel";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
