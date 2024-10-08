import { CustomEventWithDetail, html, View } from "rune-ts";

export type GameKeyboardItemVariant =
  | "enter"
  | "backspace"
  | "default"
  | "include"
  | "correct"
  | "incorrect";

export type GameKeyboardItem = {
  char: string;
  variant: GameKeyboardItemVariant;
};

export class KeyboardSelected extends CustomEventWithDetail<GameKeyboardItem> {}

export class GameKeyboardItemView extends View<GameKeyboardItem> {
  override template() {
    return html` <div class="keyboard__box" data-variant="${this.data.variant}">
      ${this.data.char}
    </div>`;
  }

  public setKeyboardItem(variant: GameKeyboardItemVariant) {
    this.data.variant = variant;
    this.redraw();
  }

  override onRender() {
    this.addEventListener("click", this._click);
  }

  private _click() {
    this.dispatchEvent(KeyboardSelected, { detail: this.data, bubbles: true });
  }
}
