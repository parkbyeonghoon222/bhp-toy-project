import { html, View } from "rune-ts";
import "./clothesContent.scss";

export type ClothesContent = {
  list: string[];
};

export class ClothesContentView extends View<ClothesContent> {
  constructor(data?: ClothesContent) {
    super(data ?? { list: [] });
  }

  override template() {
    return html`
      <section class="clothes__content">아우터를 인기순으로 보여줘</section>
    `;
  }
}
