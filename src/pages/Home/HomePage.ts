import { html, Page } from "rune-ts";
import "./homePage.scss";
import { LoginView } from "../../entities/user/ui";

export class HomePage extends Page<Record<string, any>> {
  constructor() {
    super({});
  }

  override template() {
    return html` <div>${new LoginView()}</div> `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());
  }
}
