import { html, View } from "rune-ts";

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

export class GameKeyboardItemView extends View<GameKeyboardItem> {
  override template() {
    return html` <div class="keyboard__box" data-variant="${this.data.variant}">
      ${this.data.char}
    </div>`;
  }

  public setKeyboardItem(char: string, variant: GameKeyboardItemVariant) {
    this.data.char = char;
    this.data.variant = variant;
  }
}
