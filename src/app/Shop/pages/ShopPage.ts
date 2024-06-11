import { html, Page } from "rune-ts";
import { ShopContentView, ShopFilterView } from "../entities/clothes/ui";
import { HeaderView } from "../widgets/header/ui";
import { FooterView } from "../widgets/footer/ui";

import "./shopPage.scss";

export type Shop = Record<string, string>;

export class ShopPage extends Page<Shop> {
  override template() {
    return html`
      <div id="shop__main">
        ${new HeaderView({})} ${new ShopFilterView({})}
        ${new ShopContentView({})}${new FooterView({})}
      </div>
    `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }
}
