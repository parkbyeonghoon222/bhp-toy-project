import { QUERY, VALUES } from "../../../../server/db";
import { Session } from "../types";
// @ts-ignore
import * as changeKeys from "change-case/keys";

export const createSession = async (session: Session): Promise<void> => {
  await QUERY`INSERT INTO byeongpple_shop.sessions ${VALUES([changeKeys.snakeCase(session)])}`;
};
