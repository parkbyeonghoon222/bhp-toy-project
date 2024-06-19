import { View } from "rune-ts";
import {
  ClothesContentView,
  ClothesFilterView,
  ClothesModalView,
  ClothesTabView,
} from "../ui";
import { PaginationView } from "../../../shared/components/molecule/Pagination/Pagination";

export class ClothesController<T extends object, IV extends View<T>> {
  constructor(
    public clothesContent: ClothesContentView,
    public clothesFilter: ClothesFilterView,
    public clothesTab: ClothesTabView,
    public paginationView: PaginationView,
    public clothesModalView: ClothesModalView,
  ) {}
}
