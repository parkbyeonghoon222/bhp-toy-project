import { QUERY, VALUES } from "../../../../server/db";
import { Cart, CreateCartParams } from "../types";
import { DatabaseError } from "pg";

// @ts-ignore
import * as changeKeys from "change-case/keys";

export const createCart = async (cart: CreateCartParams): Promise<Cart> => {
  try {
    const rows =
      await QUERY`INSERT INTO byeongpple_shop.cart ${VALUES([changeKeys.snakeCase(cart)])} RETURNING *;`;
    return rows.length ? rows[0] : undefined;
  } catch (error) {
    const pgError = error as DatabaseError;

    if (pgError.code === "23505") {
      throw new Error("이미 담은 장바구니 입니다.");
    }
    throw pgError;
  }
};
