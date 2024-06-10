import { html, Page } from "rune-ts";
import "./shopFilter.scss";

export type ShopFilter = Record<string, string>;

export class ShopFilterView extends Page<ShopFilter> {
  override template() {
    return html`
      <section class="shop__filter">아우터를 인기순으로 보여줘</section>
    `;
  }
}
