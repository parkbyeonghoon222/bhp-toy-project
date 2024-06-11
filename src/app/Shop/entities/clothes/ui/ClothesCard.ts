import { html, View } from "rune-ts";
import "./clothesCard.scss";

export type ClothesCard = {
  imageUrl: string;
  category: string;
  title: string;
  price: string;
  imageAlt?: string;
};

export class ClothesCardView extends View<ClothesCard> {
  constructor({ imageAlt = "이미지", ...data }: ClothesCard) {
    super({ ...data, imageAlt });
  }

  override template({
    imageUrl,
    category,
    title,
    price,
    imageAlt,
  }: ClothesCard) {
    return html`
      <div class="clothes__card">
        <div class="image"><img src="${imageUrl}" alt="${imageAlt}" /></div>
        <div class="category">${category}</div>
        <div class="title">${title}</div>
        <div class="price">${price}</div>
      </div>
    `;
  }
}
