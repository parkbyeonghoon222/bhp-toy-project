import { html, View } from "rune-ts";
import { GameBoardItemView } from "./GameBoardItemView";

export type GameManual = {};

export class GameManualView extends View<GameManual> {
  override template() {
    return html`
      <dialog class="manual__modal" open>
        <div class="manual__modal--top">
          <h2>How To Play</h2>
          <button class="manual__modal--close">X</button>
        </div>

        <h3>6번만에 워들을 맞추세요!</h3>
        <section class="manual__modal--content">
          <ul>
            <li>한번의 시도마다 5글자의 영어 단어를 입력해주세요</li>
            <li>
              각 시도마다 타일의 색상들이 변경되고, 각 색상들에는 의미가
              있습니다.
            </li>
          </ul>
          <h4>Examples</h4>
          <div class="manual__modal--example">
            <div class="example__content">
              ${"WEARY".split("").map(
                (letter, index) =>
                  new GameBoardItemView({
                    char: letter,
                    variant: letter === "W" ? "correct" : "empty",
                    index,
                  }),
              )}
            </div>
            <p>초록색은 해당 글자가 정확한 위치에 있음을 의미합니다.</p>
          </div>

          <div class="manual__modal--example">
            <div class="example__content">
              ${"PILLS".split("").map(
                (letter, index) =>
                  new GameBoardItemView({
                    char: letter,
                    variant: letter === "I" ? "include" : "empty",
                    index,
                  }),
              )}
            </div>
            <p>
              하늘색은 해당 글자가 단어에 포함되지만 위치가 다름을 의미합니다.
            </p>
          </div>
          <div class="manual__modal--example">
            <div class="example__content">
              ${"VAGUE".split("").map(
                (letter, index) =>
                  new GameBoardItemView({
                    char: letter,
                    variant: letter === "U" ? "incorrect" : "empty",
                    index,
                  }),
              )}
            </div>
            <p>회색은 해당 글자가 단어에 포함되지 않음을 의미합니다.</p>
          </div>
        </section>
      </dialog>
    `;
  }

  override onRender() {
    const dialog = this.element() as HTMLDialogElement;
    const button = dialog?.querySelector("button");

    button?.addEventListener("click", () => {
      dialog.close();
    });

    window.addEventListener("keypress", () => {
      dialog.close();
    });
  }
}
