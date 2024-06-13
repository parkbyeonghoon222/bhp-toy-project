import { html, View } from "rune-ts";
import "./loginInputView.scss";

export interface LoginInput {
  className?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}

export class LoginInputView extends View<LoginInput> {
  override template({
    value = "",
    type = "text",
    placeholder = "",
    maxLength = 255,
    className = "",
  }: LoginInput) {
    return html`
      <input
        class="${className}"
        type="${type}"
        placeholder="${placeholder}"
        maxlength="${maxLength}"
        value="${value}"
      />
    `;
  }

  getValue() {
    const thisElement = this.element() as HTMLInputElement;
    return thisElement.value;
  }
}
