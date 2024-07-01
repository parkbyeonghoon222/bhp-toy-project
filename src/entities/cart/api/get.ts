import { QUERY } from "../../../../server/db";
import { Cloth } from "../../clothes/types";

// @ts-ignore
import * as changeKeys from "change-case/keys";

export const getCartsBySessionId = async (
  session_id: string,
): Promise<Cloth[]> => {
  const rows = await QUERY`
      SELECT cart.*, cloth.master_category, cloth.article_type, cloth.product_display_name, cloth.image_url FROM byeongpple_shop.cart as cart
          INNER JOIN byeongpple_shop.cloth as cloth
              ON cart.cloth_id = cloth.id
          WHERE cart.session_id = ${session_id} 
          
  `;

  return rows.map((row) => changeKeys.camelCase(row));
};
