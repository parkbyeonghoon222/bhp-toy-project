import type { View } from "rune-ts";
import { ClothesContentView, ClothesFilter } from "../ui";
import { getClothes, GetClothesParams } from "../api";

export class ClothesController<T extends object, IV extends View<T>> {
  constructor(
    public clothesContent: ClothesContentView,
    public clothesFilter: ClothesFilter,
  ) {}

  private async _setClothesAsync(params: GetClothesParams) {
    const result = await getClothes(params);
    return result.data;
  }
}
