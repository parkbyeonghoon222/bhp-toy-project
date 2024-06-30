import { html, View } from "rune-ts";
import "./clothesContent.scss";
import { ClothesCardView } from "../ClothesCard";
import {
  concurrent,
  each,
  filter,
  map,
  pipe,
  sum,
  toArray,
  toAsync,
} from "@fxts/core";
import { Cloth } from "../../types";

export type ClothesContent = {
  clothes: Cloth[];
};

export class ClothesContentView extends View<ClothesContent> {
  height: string = "calc(100vh = 228px)";
  clothesCardViews: ClothesCardView[] = this._createClothesViews(
    this.data.clothes,
  );

  override template({ clothes }: ClothesContent) {
    return clothes.length > 0
      ? html`
          <section class="clothes__content">${this.clothesCardViews}</section>
        `
      : html`
          <div class="empty" style="height: ${this.height}">
            <div class="empty__title">원하는 조건에 맞는 상품이 없습니다.</div>
            <div class="empty__description">
              다른 조건으로 상품을 찾아보세요!
            </div>
          </div>
        `;
  }

  override onRender() {
    this._adjustCurrentHeight();
    this._loadLazyClothesViews(5);
    this.redraw();
  }

  private _adjustCurrentHeight() {
    const siblings = this.element().parentElement!.children;
    const allHeight = pipe(
      siblings,
      filter((ele) => ele !== this.element()),
      filter((ele) => {
        const position = window.getComputedStyle(ele).position;
        return position === "static" || position === "relative";
      }),
      map((ele) => ele.clientHeight),
      sum,
      (height) => `calc(100vh - ${height}px)`,
    );
    this.height = allHeight;
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
