import { html, Page } from "rune-ts";
import "./clothesFilter.scss";

export type ClothesFilter = Record<string, string>;

export class ShopFilterView extends Page<ClothesFilter> {
  override template() {
    return html`
      <div class="clothes__filter">아우터를 인기순으로 보여줘</div>
    `;
  }
}
