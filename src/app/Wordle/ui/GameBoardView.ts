import { html, View } from "rune-ts";
import { map, pipe, range, toArray } from "@fxts/core";

export type GameBoardItem = {
  char: string;
  variant?:
    | "disabled"
    | "empty"
    | "entered"
    | "include"
    | "correct"
    | "incorrect";
};

export class GameBoardItemView extends View<GameBoardItem> {
  override template() {
    return html` <div class="wordle__box" data-variant="${this.data.variant}">
      ${this.data.char}
    </div>`;
  }
}

export type GameBoard = {};

export class GameBoardView extends View<GameBoard> {
  tryCnt: number = 0;
  currentIndex: number = 0;
  board = pipe(
    range(30),
    map(
      (index) =>
        new GameBoardItemView({
          char: "",
          variant: index < 5 ? "empty" : "disabled",
        }),
    ),
    toArray,
  );

  override template({}: GameBoard) {
    return html` <div class="wordle__container">${this.board}</div>`;
  }

  // todo: 함수형으로 바꿔보자
  override onRender() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      const currentEle = this.element().querySelector(
        `.wordle__box:nth-of-type(${this.currentIndex + 1})`,
      ) as HTMLDivElement;
      if (e.code.includes("Key")) {
        this.appendBoardItem(currentEle, e.code.replace("Key", ""));
      } else if (e.code === "Backspace") {
        this.removeBoardItem(currentEle);
      }
    });
  }

  private appendBoardItem(currentEle: HTMLDivElement, char: string) {
    if (this.currentIndex < this.tryCnt * 5 + 5) {
      this.board[this.currentIndex].data.char = char;
      this.board[this.currentIndex].data.variant = "entered";
      currentEle.innerHTML = char;
      currentEle.setAttribute("data-variant", "entered");
      this.currentIndex =
        this.currentIndex + 1 < this.tryCnt * 5 + 5
          ? this.currentIndex + 1
          : this.currentIndex;
    }
  }

  private removeBoardItem(currentEle: HTMLDivElement) {
    if (this.currentIndex >= this.tryCnt * 5) {
      this.board[this.currentIndex].data.char = "";
      this.board[this.currentIndex].data.variant = "empty";
      currentEle.innerHTML = "";
      currentEle.setAttribute("data-variant", "empty");
      this.currentIndex =
        this.currentIndex - 1 >= this.tryCnt * 5
          ? this.currentIndex - 1
          : this.currentIndex;
    }
  }
}
