import { html, View } from "rune-ts";
import "./clothesContent.scss";
import { ClothesCardView } from "./ClothesCard";
import { map, pipe, toArray } from "@fxts/core";
import { Cloth } from "../model";

export type ClothesContent = {};

export class ClothesContentView extends View<ClothesContent> {
  clothesCardViews?: ClothesCardView[] = [];

  constructor() {
    super({});
  }

  override template() {
    return html`
      <section class="clothes__content">${this.clothesCardViews}</section>
    `;
  }

  setClothesCardViews(clothes: Cloth[]) {
    this.clothesCardViews = this._createClothesViews(clothes);
    this.redraw();
  }

  private _createClothesViews(clothes: Cloth[]): ClothesCardView[] {
    return pipe(
      clothes,
      map((cloth) => ({
        imageUrl: cloth.imageUrl,
        category: cloth.masterCategory,
        title: cloth.productDisplayName,
        year: cloth.year,
      })),
      map((clothData) => new ClothesCardView(clothData)),
      toArray,
    );
  }
}
