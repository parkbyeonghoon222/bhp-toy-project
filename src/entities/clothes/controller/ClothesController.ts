import { Enable, on, View } from "rune-ts";
import {
  ClothesContentView,
  ClothesFilterView,
  ClothesModalView,
  ClothesTabView,
} from "../ui";
import { PaginationView } from "../../../shared/components/molecule/Pagination/Pagination";

// 이게 좋은 방법일까?
export class FilterModalEnable extends Enable {
  constructor(
    public override view: ClothesFilterView,
    public targetView: ClothesModalView,
  ) {
    super(view);
  }

  @on("click")
  private _click() {
    this.targetView.showModal();
    this.targetView.redraw();
  }
}

export class ClothesController<T extends object, IV extends View<T>> {
  filterModal = new FilterModalEnable(
    this.clothesFilter,
    this.clothesModalView,
  );

  constructor(
    public clothesContent: ClothesContentView,
    public clothesFilter: ClothesFilterView,
    public clothesTab: ClothesTabView,
    public paginationView: PaginationView,
    public clothesModalView: ClothesModalView,
  ) {}
}
