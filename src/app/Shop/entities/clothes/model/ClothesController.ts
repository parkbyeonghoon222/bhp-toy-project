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
  ) {}

  private async getClothes(params: GetClothesParams) {
    const rows = await getClothes(params);

    console.log(rows);
  }
}
