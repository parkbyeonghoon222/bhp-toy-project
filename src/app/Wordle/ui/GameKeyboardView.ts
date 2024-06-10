import { html, View } from "rune-ts";
import { map, pipe, toArray } from "@fxts/core";
import { GameKeyboardItem, GameKeyboardItemView } from "./GameKeyboardItemView";
import { KEYBOARD_CHARS } from "../const/const";

export type GameKeyboard = {};

const createGameKeyboard = () =>
  pipe(
    KEYBOARD_CHARS,
    map(
      (char) =>
        ({
          char,
          variant:
            char.length > 1
              ? char === "ENTER"
                ? "enter"
                : "backspace"
              : "default",
        }) as GameKeyboardItem,
    ),
    map(({ char, variant }) => new GameKeyboardItemView({ char, variant })),
    toArray,
  );

export class GameKeyboardView extends View<GameKeyboard> {
  gameKeyboardItemViews: GameKeyboardItemView[] = createGameKeyboard();

  override template() {
    return html`
      <div class="keyboard__container">
        <div class="keyboard__row">
          ${this.gameKeyboardItemViews.slice(0, 10)}
        </div>
        <div class="keyboard__row">
          ${this.gameKeyboardItemViews.slice(10, 19)}
        </div>
        <div class="keyboard__row">
          ${this.gameKeyboardItemViews.slice(19, 28)}
        </div>
      </div>
    `;
  }

  getKeyboardItemViewByChar(char: string) {
    return this.gameKeyboardItemViews.find(
      (gameKeyboardItem) => gameKeyboardItem.data.char === char,
    );
  }

  resetKeyboard() {
    this.gameKeyboardItemViews = createGameKeyboard();
  }
}
