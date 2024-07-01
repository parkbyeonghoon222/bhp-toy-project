import { html, on, Page } from "rune-ts";
import "./cartPage.scss";
import { HeaderView } from "../../widgets/header/ui";
import { Cloth } from "../../entities/clothes/types";
import { CartRowView } from "../../entities/cart/ui/CartRow";
import { client } from "../../shared";

export type CartPageProps = {
  carts: Cloth[];
};

export class CartPage extends Page<CartPageProps> {
  private _cartRowViews = this.data.carts.map((cart) => new CartRowView(cart));

  override template({ carts }: CartPageProps) {
    return html`
      <div id="cart">
        ${new HeaderView({})}
        <div class="cart__title">장바구니</div>
        <div class="cart__content">${this._cartRowViews}</div>
      </div>
    `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }

  @on("click", "div.cart__row .cart__close")
  private _clickCartItemClose(event: MouseEvent) {
    const closeElement = event.currentTarget as HTMLDivElement;
    const id = closeElement.getAttribute("data-id") as string;
    client.deleteCart.mutate(Number(id)).then(() => {
      window.location.reload();
    });
  }
}
