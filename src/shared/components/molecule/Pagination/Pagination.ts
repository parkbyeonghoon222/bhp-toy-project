import { html, on, View } from "rune-ts";
import { map, pipe, range, toArray } from "@fxts/core";
import "./Pagination.scss";
import {
  PaginationItem,
  PaginationItemProps,
} from "../../atoms/PaginationItem/PaginationItem";

export interface PaginationProps {
  count: number;
}

export class PaginationView extends View<PaginationProps> {
  start: number = 0;
  end: number = 0;
  page: number = 0;
  pageNationButtons: PaginationItem[] = [];

  override template() {
    return html`
      <div class="pagination">
        <div class="pagination__left"><</div>
        ${this.pageNationButtons}
        <div class="pagination__right">></div>
      </div>
    `;
  }

  override onRender() {
    this._setPaginationParams();
    this._setPaginationButtons();
  }

  private _getQueryParams() {
    const queryParams = new URLSearchParams(window.location.search);
    const limit = parseInt(queryParams.get("limit") || "20");
    const page = parseInt(queryParams.get("page") || "1");
    return { limit, page };
  }

  private _setPaginationParams() {
    const { limit, page } = this._getQueryParams();
    this.start = page % 10 === 0 ? page - 10 || 1 : page - (page % 10) + 1;
    this.page = page;
    this.end = Math.min(
      this.start + 10,
      Math.ceil(this.data.count / limit) + 1,
    );
    this.redraw();
  }

  private _setPaginationButtons() {
    this.pageNationButtons = pipe(
      range(this.start, this.end),
      map(
        (index) =>
          ({
            index,
            isActive: this.page === index,
          }) as PaginationItemProps,
      ),
      map((buttonProp) => new PaginationItem(buttonProp)),
      toArray,
    );
    this.redraw();
  }

  @on("click", ".pagination__item")
  private _clickPaginationItem(event: MouseEvent) {
    const selectedItem = event.target as HTMLElement;
    this._gotoPage(selectedItem.innerText);
  }

  @on("click", ".pagination__left")
  private _clickPaginationLeft(event: MouseEvent) {
    this._gotoPage(`${Math.max(this.start - 1, 1)}`);
  }

  @on("click", ".pagination__right")
  private _clickPaginationRight(event: MouseEvent) {
    const { limit, page } = this._getQueryParams();
    this._gotoPage(`${Math.min(this.end, Math.ceil(this.data.count / limit))}`);
  }

  private _gotoPage(page: string) {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("page", page);
    window.location.href =
      window.location.pathname + "?" + queryParams.toString();
  }
}
