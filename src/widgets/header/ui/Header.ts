import { html, Page } from "rune-ts";
import "./Header.scss";
import {
  Heart,
  MarppleShopLogo,
  Profile,
  ShoppingCart,
} from "../../../shared/svgs";

export type Header = Record<string, string>;

export class HeaderView extends Page<Header> {
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
            <input type="text" class="header__input" />
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
}
