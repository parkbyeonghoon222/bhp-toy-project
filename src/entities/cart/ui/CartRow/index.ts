import { html, View } from "rune-ts";
import "./cartRow.scss";
import { Cloth } from "../../../clothes/types";
import { CloseIcon } from "../../../../shared/components/atoms/Icon/icons";

export class CartRowView extends View<Cloth> {
  constructor({ ...data }: Cloth) {
    super({ ...data });
  }

  override template({
    id,
    imageUrl,
    productDisplayName,
    masterCategory,
    articleType,
  }: Cloth) {
    return html`
      <div class="cart__row">
        <div class="left__container">
          <img class="cart__image" src="${imageUrl}" alt="장바구니 이미지" />
        </div>
        <div class="right__container">
          <div class="cart__title">${productDisplayName}</div>
          <div class="cart__description">
            ${masterCategory} > ${articleType}
          </div>
        </div>
        <div class="cart__close" data-id="${id}">${CloseIcon}</div>
      </div>
    `;
  }
}
