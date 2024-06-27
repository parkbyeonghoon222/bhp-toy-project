import { View } from "rune-ts";
import { LoginInputView } from "../ui";
import { ButtonAction } from "../../../shared/components/atoms/ButtonAction/ButtonAction";
import { pipe, throwIf } from "@fxts/core";
import { User } from "../types";
import { validateEmail, validatePassword } from "../../../shared/lib/utls";
import { login } from "../api";

export class LoginController<T extends object, IV extends View<T>> {
  constructor(
    public loginEmailInput: LoginInputView,
    public loginPasswordInput: LoginInputView,
    public loginButton: ButtonAction,
  ) {}

  // 하위 함수에서의 에러는 터지게 두자
  // 에러핸들링은 위 뷰에서 처리
  submitLoginForm() {
    const email = this.loginEmailInput.getValue();
    const password = this.loginPasswordInput.getValue();

    return pipe(
      { email, password },
      throwIf(
        (loginData) => !this._validateLoginInput(loginData),
        (loginData) => Promise.reject(this._loginError(loginData)),
      ),
      login,
    );
  }

  private _validateLoginInput = ({ email, password }: User) => {
    return validateEmail(email) && validatePassword(password);
  };

  private _loginError = ({ email, password }: User) => {
    return Error("에러");
  };
}
