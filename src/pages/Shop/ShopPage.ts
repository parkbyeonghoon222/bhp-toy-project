import { html, on, Page } from "rune-ts";
import {
  ClothesContentView,
  ClothesFilterView,
  ClothesModalEvent,
  ClothesModalView,
  ClothesTabView,
} from "../../entities/clothes/ui";
import { HeaderView } from "../../widgets/header/ui";
import { FooterView } from "../../widgets/footer/ui";
import { ClothesController } from "../../entities/clothes/controller";

import "./shopPage.scss";
import { Cloth } from "../../entities/clothes/types";
import { PaginationView } from "../../shared/components/molecule/Pagination/Pagination";

export type Shop = {
  clothes: Cloth[];
  count: number;
};

export class ShopPage extends Page<Shop> {
  private _clothesController = new ClothesController(
    new ClothesContentView({ clothes: this.data.clothes }),
    new ClothesFilterView(),
    new ClothesTabView({ count: this.data.count }),
    new PaginationView({ count: this.data.count }),
    new ClothesModalView(),
  );

  override template() {
    return html`
      <div id="shop__main">
        ${new HeaderView({})} ${this._clothesController.clothesTab}
        ${this._clothesController.clothesContent}
        ${this._clothesController.paginationView}
        ${this._clothesController.clothesFilter}${new FooterView({})}
        ${this._clothesController.clothesModalView}
      </div>
    `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }

  @on(ClothesModalEvent)
  private _modalListener() {
    this._clothesController.clothesModalView.showModal();
  }
}
