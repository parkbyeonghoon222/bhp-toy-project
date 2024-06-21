import { html, View } from "rune-ts";
import "./clothesFilter.scss";
import { FilterIcon } from "../../../shared/components/atoms/Icon/icons";

export type ClothesFilter = {};

export class ClothesFilterView extends View<ClothesFilter> {
  override template() {
    return html`
      <div class="shop__filter">
        <span class="shop__filter--icon">${FilterIcon}</span><span>Filter</span>
      </div>
    `;
  }
}
