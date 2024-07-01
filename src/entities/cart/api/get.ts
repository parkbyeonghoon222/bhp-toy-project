import { QUERY } from "../../../../server/db";
import { Cart } from "../types";

export const getCartsBySessionId = async (
  session_id: string,
): Promise<Cart[]> => {
  return await QUERY`
    SELECT * FROM byeongpple_shop.cart WHERE session_id = ${session_id};
  `;
};
