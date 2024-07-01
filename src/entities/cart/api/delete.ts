import { QUERY } from "../../../../server/db";
import { Cart } from "../types";

export const deleteCart = async (id: number): Promise<Cart> => {
  const result = QUERY`DELETE FROM byeongpple_shop.cart WHERE id = ${id} RETURNING *;`;
  return result.rows.length ? result.rows[0] : undefined;
};
