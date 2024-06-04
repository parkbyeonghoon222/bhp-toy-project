import { html, View } from "rune-ts";
import { each, map, pipe, range } from "@fxts/core";

export type GameBoardItem = {
  char: string;
  variant?: "disabled" | "entered" | "include" | "correct" | "incorrect";
};

export class GameBoardItemView extends View<GameBoardItem> {
  override template({ char, variant }: GameBoardItem) {
    return html` <div class="wordle__box" data-variant="${variant}">
      ${char}
    </div>`;
  }
}

export type GameBoard = {};

export class GameBoardView extends View<GameBoard> {
  tryCnt: number = 0;
  board: GameBoardItemView[] = [];

  override template({}: GameBoard) {
    return html` <div class="wordle__container"></div>`;
  }

  // todo: 함수형으로 바꿔보자
  override onRender() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code.includes("Key")) {
        this.appendBoardItem(e.code.replace("Key", ""));
      } else if (e.code === "Backspace") {
        this.removeBoardItem();
      }

      console.log(this.board);
    });
  }

  protected _onMount(): this {
    this.createButtons(this._element);

    return super._onMount();
  }

  private appendBoardItem(char: string) {
    if (this.board.length < this.tryCnt + 5) {
      this.board.push(
        new GameBoardItemView({
          char: "",
          variant: "disabled",
        }),
      );
    }
  }

  private removeBoardItem() {
    this.board.pop();
  }

  private createButtons(targetElement: HTMLElement) {
    return pipe(
      range(30),
      map((index) =>
        new GameBoardItemView({
          char: "",
          variant: "disabled",
        }).render(),
      ),
      each((element) => {
        targetElement.append(element);
      }),
    );
  }
}
