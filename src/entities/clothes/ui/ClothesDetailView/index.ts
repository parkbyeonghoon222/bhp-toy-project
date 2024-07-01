import { html, View } from "rune-ts";
import "./clothesDetailView.scss";
import { Cloth } from "../../types";
import { ButtonAction } from "../../../../shared/components/atoms/ButtonAction/ButtonAction";
import { client } from "../../../../shared";

export type ClothesDetail = { cloth: Cloth };

export class Index extends View<ClothesDetail> {
  buyButton: ButtonAction = new ButtonAction({
    label: "바로 구매하기",
    type: "blue",
    size: "large",
  });
  cartButton: ButtonAction = new ButtonAction({
    label: "장바구니",
    type: "line",
    size: "large",
  });

  override template({ cloth }: ClothesDetail) {
    return html`
      <section class="shop__detail">
        <div class="product__preview">
          <img
            class="product__preview--image"
            src="${cloth.imageUrl}"
            alt="제품 이미지"
          />
        </div>
        <img class="product__image" src="${cloth.imageUrl}" alt="제품 이미지" />
        <div class="product__detail">
          <div class="product__detail--header">MYBOX</div>
          <div class="product__detail--title">${cloth.productDisplayName}</div>
          <div class="product__detail--tags">
            ${cloth.articleType} > ${cloth.subCategory}
          </div>
          <div class="product__detail--buttons">
            ${this.cartButton} ${this.buyButton}
          </div>
        </div>
      </section>
    `;
  }

  override onRender() {
    this.cartButton.addEventListener("click", () => {
      client.createCart
        .mutate(Number(this.data.cloth.id))
        .then(() => {
          if (window.confirm("장바구니 등록완")) {
            window.location.href = window.location.origin + "/cart";
          }
        })
        .catch(() => {
          window.alert("이미 등록된 상품입니다.");
        });
    });
  }
}
