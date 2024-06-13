import { html, on, View } from "rune-ts";
import "./homeLogin.scss";
import { ButtonAction } from "../../../shared/components/atoms/ButtonAction/ButtonAction";

export class HomeLoginView extends View {
  private _loginButton: ButtonAction = new ButtonAction({
    label: "login",
    type: "blue",
    size: "regular",
  });

  override template() {
    return html`
      <main class="login__container">
        <section class="login__content">
          <h1 class="login__title">박병훈의 토이프로젝트</h1>
          <div class="login__form">
            <input class="login__input" type="email" placeholder="Email" />
            <input
              class="login__input"
              type="password"
              placeholder="Password"
            />
          </div>
          ${this._loginButton}
        </section>
      </main>
    `;
  }

  @on("click")
  private _clickLogin(): void {
    console.log("클릭ㄴ");
  }
}
