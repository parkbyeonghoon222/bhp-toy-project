import { html, Page } from "rune-ts";
import { ShopFilterView } from "../entities/clothes/ui/ShopFilter";
import { ShopContentView } from "../entities/clothes/ui/ShopContent";

import "./shopPage.scss";

export type Shop = Record<string, string>;

export class ShopPage extends Page<Shop> {
  override template() {
    return html`
      <div id="shop__main">
        ${new ShopFilterView({})} ${new ShopContentView({})}
      </div>
    `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }
}
