import { html, Page } from "rune-ts";
import "./cartPage.scss";
import { HeaderView } from "../../widgets/header/ui";

export type CartPageProps = {};

export class CartPage extends Page<CartPageProps> {
  constructor() {
    super({});
  }

  override template() {
    return html` <div id="cart">${new HeaderView({})}</div> `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }
}
