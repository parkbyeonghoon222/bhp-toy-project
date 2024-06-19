import { html, on, View } from "rune-ts";
import "./clothesFilter.scss";
import { FilterIcon } from "../../../shared/components/atoms/Icon/icons";
import { ClothesModalEvent } from "./ClothesModal";

export type ClothesFilter = {};

export class ClothesFilterView extends View<ClothesFilter> {
  constructor() {
    super({});
  }

  // 모달 구현하고 카테고리 필터 먹이기
  override template() {
    return html`
      <div class="shop__filter">
        <span class="shop__filter--icon">${FilterIcon}</span><span>Filter</span>
      </div>
    `;
  }

  @on("click")
  private _click() {
    this.dispatchEvent(ClothesModalEvent, { detail: this.data, bubbles: true });
  }
}
