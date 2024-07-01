import { QUERY } from "../../../../server/db";
import { Cart, CreateCartParams } from "../types";

export const createCart = async (cart: CreateCartParams): Promise<Cart> => {
  const result =
    await QUERY`INSERT INTO cart (session_id, cloth_id) VALUES([${cart}]) RETURNING *;`;
  return result.rows.length ? result.rows[0] : undefined;
};
