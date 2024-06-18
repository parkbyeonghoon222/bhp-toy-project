import type { View } from "rune-ts";
import { ClothesContentView, ClothesFilterView } from "../ui";
import { getClothes, GetClothesParams } from "../api";
import { PaginationView } from "../../../shared/components/molecule/Pagination/Pagination";

export class ClothesController<T extends object, IV extends View<T>> {
  constructor(
    public clothesContent: ClothesContentView,
    public clothesFilter: ClothesFilterView,
    public paginationView: PaginationView,
  ) {}

  private async _setClothesAsync(params: GetClothesParams) {
    const result = await getClothes(params);
    return result.data;
  }
}
