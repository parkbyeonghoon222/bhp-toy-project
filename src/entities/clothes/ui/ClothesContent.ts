import { html, View } from "rune-ts";
import "./clothesContent.scss";
import { ClothesCardView } from "./ClothesCard";
import { concurrent, each, map, pipe, toArray, toAsync } from "@fxts/core";
import { Cloth } from "../types";

export class ClothesContentView extends View {
  clothesCardViews?: ClothesCardView[] = [];

  override template() {
    return html`
      <section class="clothes__content">${this.clothesCardViews}</section>
    `;
  }

  setClothesCardViews(clothes: Cloth[]) {
    this.clothesCardViews = this._createClothesViews(clothes);
    this.redraw();

    pipe(
      toAsync(this.clothesCardViews),
      map((clothesCardView) => clothesCardView.onLoad()),
      concurrent(10),
      each((clothesCardView) => {
        clothesCardView.element().classList.remove("fade__img");
      }),
    );
  }

  private _createClothesViews(clothes: Cloth[]): ClothesCardView[] {
    return pipe(
      clothes,
      map((cloth) => ({
        imageUrl: cloth.imageUrl,
        category: cloth.masterCategory,
        title: cloth.productDisplayName,
        year: cloth.year,
        className: "fade__img",
      })),
      map((clothData) => new ClothesCardView(clothData)),
      toArray,
    );
  }

  private _loadLazyClothesViews(clothes: ClothesCardView[]) {}
}
