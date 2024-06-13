import { html, View } from "rune-ts";
import "./homePage.scss";
import { LoginView } from "../../entities/user/ui";

export class HomePage extends View {
  override template() {
    return html` <div>${new LoginView()}</div> `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }
}
