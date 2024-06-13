import { html, View } from "rune-ts";
import "./homePage.scss";
import { HomeLoginView } from "../../entities/home/ui";

export class HomePage extends View {
  override template() {
    return html` <div>${new HomeLoginView()}</div> `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }
}
