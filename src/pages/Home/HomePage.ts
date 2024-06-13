import { html, View } from "rune-ts";

export type Home = {};

export class HomePage extends View {
  override template({}: Home) {
    return html` <div></div> `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }
}
