import { html, View } from "rune-ts";
import "./clothesFilter.scss";

export type ClothesFilter = { count: number };

export class ClothesFilterView extends View<ClothesFilter> {
  constructor({ count = 0 }) {
    super({ count: count });
  }

  override template() {
    return html`
      <section class="shop__filter">
        <div class="intro">마플샵의 상품들을 소개할게요!</div>
        <div class="shop__tab">
          <div class="product .font_bebas_40" data-active="active">
            PRODUCTS
          </div>
          <div class="curation">CURATION</div>
        </div>
        <div class="count">총 ${this.data.count}개의 상품</div>
      </section>
    `;
  }

  setCount(count: number) {
    this.data.count = count;
    this.redraw();
  }
}
