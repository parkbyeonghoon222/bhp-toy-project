import { html, on, View } from "rune-ts";
import "./loginView.scss";
import { ButtonAction } from "../../../shared/components/atoms/ButtonAction/ButtonAction";
import { LoginController } from "../controller";
import { LoginInputView } from "./LoginInputView";

export class LoginView extends View {
  private _loginController = new LoginController(
    new LoginInputView({
      className: "login__input",
      placeholder: "Email",
    }),
    new LoginInputView({
      className: "login__input",
      type: "password",
      placeholder: "Password",
    }),
    new ButtonAction({
      label: "login",
      type: "blue",
      size: "regular",
    }),
  );

  constructor() {
    super({});
  }

  override template() {
    return html`
      <main class="login__container">
        <section class="login__content">
          <h1 class="login__title">박병훈의 토이프로젝트</h1>
          <div class="login__form">
            ${this._loginController.loginEmailInput}
            ${this._loginController.loginPasswordInput}
          </div>
          ${this._loginController.loginButton}
        </section>
      </main>
    `;
  }

  @on("click", "button")
  private _clickLogin() {
    this._loginController
      .submitLoginForm()
      .then(() => {
        console.log("로그인 성공!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
