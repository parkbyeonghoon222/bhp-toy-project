import { html, Page } from "rune-ts";
import {
  ClothesContentView,
  ClothesFilterView,
} from "../../entities/clothes/ui";
import { HeaderView } from "../../widgets/header/ui";
import { FooterView } from "../../widgets/footer/ui";
import { ClothesController } from "../../entities/clothes/controller";

import "./shopPage.scss";
import { Cloth } from "../../entities/clothes/types";

export type Shop = {
  clothes: Cloth[];
  count: string;
};

export class ShopPage extends Page<Shop> {
  private _clothesController = new ClothesController(
    new ClothesContentView({}),
    new ClothesFilterView({ count: this.data.count }),
  );

  override template() {
    return html`
      <div id="shop__main">
        ${new HeaderView({})} ${this._clothesController.clothesFilter}
        ${this._clothesController.clothesContent} ${new FooterView({})}
      </div>
    `;
  }

  override onRender() {
    this._clothesController.clothesContent.setClothesCardViews(
      this.data.clothes,
    );
    document.querySelector("#body")!.append(this.element());
  }
}
