import type { View } from "rune-ts";
import { ClothesContent, ClothesContentView, ClothesFilter } from "../ui";
import { getClothes, GetClothesParams } from "../api";

export interface ClothesView<T extends object, IV extends View<T>> {
  clothesContent: ClothesContent;
  clothesFilter: ClothesFilter;
}

export class ClothesController<T extends object, IV extends View<T>> {
  constructor(
    public clothesContent: ClothesContentView,
    public clothesFilter: ClothesFilter,
  ) {
    this._setClothesAsync({
      sortColumn: "year",
      order: "DESC",
    }).then((clothes) => {
      this.clothesContent.setClothesCardViews(clothes);
    });
  }

  private async _setClothesAsync(params: GetClothesParams) {
    const result = await getClothes(params);
    return result.data;
  }
}
