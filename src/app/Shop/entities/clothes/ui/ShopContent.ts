import { html, Page } from "rune-ts";
import "./shopContent.scss";

export type ShopContent = Record<string, string>;

export class ShopContentView extends Page<ShopContent> {
  override template() {
    return html`
      <section class="shop__content">아우터를 인기순으로 보여줘</section>
    `;
  }
}
