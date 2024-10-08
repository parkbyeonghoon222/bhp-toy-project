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
          <div class="header__logo"><a href="/shop">${MarppleShopLogo}</a></div>
          <div class="header__page">
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
            <div class="header__icon" data-index="heart">${Heart}</div>
            <div class="header__icon" data-index="cart">${ShoppingCart}</div>
            <div class="header__icon" data-index="profile">${Profile}</div>
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

  @on("click", ".header__icon")
  private _goTo(event: KeyboardEvent) {
    const element = event.currentTarget as HTMLDivElement;
    window.location.href =
      window.location.origin + "/" + element.getAttribute("data-index");
  }

  private _goPageBySearch(search: string) {
    const queryParams = new URLSearchParams(window.location.search);

    if (search) {
      queryParams.set("search", search);
      queryParams.set("page", "1");
    } else {
      queryParams.delete("search");
    }
    window.location.href =
      window.location.origin + "/shop?" + queryParams.toString();
  }
}
