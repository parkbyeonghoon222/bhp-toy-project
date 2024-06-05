import { html, View } from "rune-ts";
import { map, pipe, toArray } from "@fxts/core";
import { GameKeyboardItemView } from "./GameKeyboardItemView";
import { KEYBOARD } from "../const/const";

export type GameKeyboard = {};

const createGameKeyboard = () =>
  pipe(
    KEYBOARD,
    map(
      (char) =>
        new GameKeyboardItemView({
          char,
          variant:
            char.length > 1
              ? char === "ENTER"
                ? "enter"
                : "backspace"
              : "default",
        }),
    ),
    toArray,
  );

export class GameKeyboardView extends View<GameKeyboard> {
  keyboardItems: GameKeyboardItemView[] = createGameKeyboard();

  override template() {
    return html`
      <div class="keyboard__container">
        <div class="keyboard__row">${this.keyboardItems.slice(0, 10)}</div>
        <div class="keyboard__row">${this.keyboardItems.slice(10, 19)}</div>
        <div class="keyboard__row">${this.keyboardItems.slice(19, 28)}</div>
      </div>
    `;
  }

  override onRender() {}
}
