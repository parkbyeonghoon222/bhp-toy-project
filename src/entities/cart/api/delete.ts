import { QUERY } from "../../../../server/db";
import { Cart } from "../types";

export const deleteCart = async (id: number): Promise<Cart> => {
  const rows = QUERY`DELETE FROM byeongpple_shop.cart WHERE id = ${id} RETURNING *;`;
  return rows ? rows[0] : undefined;
};
