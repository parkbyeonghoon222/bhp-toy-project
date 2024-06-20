import { html, View } from "rune-ts";
import "./clothesDetailView.scss";
import { Cloth } from "../types";

export type ClothesDetail = { cloth: Cloth };

export class ClothesDetailView extends View<ClothesDetail> {
  constructor(data: ClothesDetail) {
    super(data);
  }

  override template({ cloth }: ClothesDetail) {
    return html`
      <section class="shop__detail">
        <div class="product__preview"></div>
        <img class="product__image" src="${cloth.imageUrl}" alt="제품 이미지" />
        <div class="preview"></div>
      </section>
    `;
  }

  override onRender() {}
}
