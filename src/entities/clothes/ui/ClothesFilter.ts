import { html, View } from "rune-ts";
import "./clothesFilter.scss";

export type ClothesFilter = {};

export class ClothesFilterView extends View<ClothesFilter> {
  constructor(data?: ClothesFilter) {
    super(data ?? {});
  }

  override template() {
    return html`
      <section class="shop__filter">아우터를 인기순으로 보여줘</section>
    `;
  }
}
