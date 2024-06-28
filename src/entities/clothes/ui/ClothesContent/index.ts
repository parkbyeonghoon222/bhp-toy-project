import { html, View } from "rune-ts";
import "./clothesContent.scss";
import { ClothesCardView } from "../ClothesCard";
import { concurrent, each, map, pipe, toArray, toAsync } from "@fxts/core";
import { Cloth } from "../../types";

export type ClothesContent = {
  clothes: Cloth[];
};

export class ClothesContentView extends View<ClothesContent> {
  clothesCardViews: ClothesCardView[] = this._createClothesViews(
    this.data.clothes,
  );

  override template() {
    return html`
      <section class="clothes__content">${this.clothesCardViews}</section>
    `;
  }

  override onRender() {
    this._loadLazyClothesViews(5);
    this.redraw();
  }

  private _createClothesViews(clothes: Cloth[]): ClothesCardView[] {
    return pipe(
      clothes,
      map((cloth) => ({
        id: cloth.id,
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

  private _loadLazyClothesViews(lazyCount: number = 10) {
    pipe(
      toAsync(this.clothesCardViews),
      map((clothesCardView) => clothesCardView.onLoad()),
      concurrent(lazyCount),
      each((clothesCardView) => {
        clothesCardView.element().classList.remove("fade__img");
      }),
    );
  }
}
