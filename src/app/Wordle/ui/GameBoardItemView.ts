import { html, View } from "rune-ts";

export type GameBoardItemVariant =
  | "disabled"
  | "empty"
  | "entered"
  | "include"
  | "correct"
  | "incorrect";

export type GameBoardItem = {
  char: string;
  index: number;
  variant: GameBoardItemVariant;
};

export class GameBoardItemView extends View<GameBoardItem> {
  override template() {
    return html` <div class="wordle__box" data-variant="${this.data.variant}">
      ${this.data.char}
    </div>`;
  }

  public setBoardItem(char: string, variant: GameBoardItemVariant) {
    this.data.char = char;
    this.data.variant = variant;
  }
}
