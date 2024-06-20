import { html, Page } from "rune-ts";

import "./shopPageDetail.scss";
import { Cloth } from "../../entities/clothes/types";
import { HeaderView } from "../../widgets/header/ui";
import { FooterView } from "../../widgets/footer/ui";

export type ShopDetail = {
  cloth: Cloth;
};

export class ShopPageDetail extends Page<ShopDetail> {
  override template() {
    return html`
      <div id="shop__main">${new HeaderView({})} ${new FooterView({})}</div>
    `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }
}
