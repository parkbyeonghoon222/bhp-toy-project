import { QUERY } from "../../../../server/db";
import { Cart } from "../types";

export const getCartsBySessionId = async (
  session_id: string,
): Promise<Cart[]> => {
  const result = QUERY`
    SELECT * FROM cart WHERE session_id = ${session_id};
  `;
  return result.rows;
};
