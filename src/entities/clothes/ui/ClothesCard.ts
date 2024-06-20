import { html, on, View } from "rune-ts";
import "./clothesCard.scss";

export type ClothesCard = {
  id: number;
  imageUrl: string;
  category: string;
  title: string;
  year: number;
  imageAlt?: string;
  className?: string;
};

export class ClothesCardView extends View<ClothesCard> {
  constructor({ imageAlt = "이미지", ...data }: ClothesCard) {
    super({ ...data, imageAlt });
  }

  override template({
    imageUrl,
    category,
    title,
    year,
    imageAlt = "",
    className = "",
  }: ClothesCard) {
    return html`
      <div class="clothes__card ${className}">
        <div class="image">
          <img src="" lazy-src="${imageUrl}" alt="${imageAlt}" />
        </div>
        <div class="category">${category}</div>
        <div class="title">${title}</div>
        <div class="year">${year}</div>
      </div>
    `;
  }

  onLoad = () => {
    return new Promise<ClothesCardView>((resolve, reject) => {
      const img = this.element().querySelector("img") as HTMLImageElement;
      img.onload = () => {
        resolve(this);
      };
      img.src = img.getAttribute("lazy-src") || "";
    });
  };

  @on("click")
  private _clickCard() {
    window.location.href = window.location.origin + `/shop/${this.data.id}`;
  }
}
