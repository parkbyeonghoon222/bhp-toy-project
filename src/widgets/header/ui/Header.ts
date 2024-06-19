import { html, on, Page } from "rune-ts";
import "./Header.scss";
import {
  Heart,
  MarppleShopLogo,
  Profile,
  ShoppingCart,
} from "../../../shared/svgs";
import { SearchIcon } from "../../../shared/components/atoms/Icon/icons";

export type Header = {
  searchValue?: string;
};

export class HeaderView extends Page<Header> {
  searchValue: string = "";

  override template() {
    return html`
      <header id="shop__header">
        <div class="header__left">
          <div class="header__logo">${MarppleShopLogo}</div>
          <div class="header__page">
            <a href="/shop/creator">Creator</a>
            <a href="/shop/pop-up">Pop-up Store</a>
            <a href="/shop">Shop</a>
          </div>
        </div>
        <div class="header__right">
          <div class="header__search">
            <input
              type="text"
              class="header__input"
              value="${this.searchValue}"
            />
            <span class="search__icon">${SearchIcon}</span>
          </div>
          <div class="header__icons">
            <div class="header__icon">${Heart}</div>
            <div class="header__icon">${ShoppingCart}</div>
            <div class="header__icon">${Profile}</div>
          </div>
        </div>
      </header>
    `;
  }

  override onRender() {
    const queryParams = new URLSearchParams(window.location.search);
    this.searchValue = queryParams.get("search") || "";
    this.redraw();
  }

  @on("keypress", "input.header__input")
  private _searchPage(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const searchText = (event.currentTarget as HTMLInputElement).value;
      this._goPageBySearch(searchText);
    }
  }

  @on("click", "span.search__icon")
  private _searchIcon(event: KeyboardEvent) {
    const searchText = (
      this.element().querySelector("input.header__input") as HTMLInputElement
    ).value;
    this._goPageBySearch(searchText);
  }

  private _goPageBySearch(search: string) {
    if (search) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set("search", search);
      queryParams.set("page", "1");
      window.location.href =
        window.location.pathname + "?" + queryParams.toString();
    }
  }
}
