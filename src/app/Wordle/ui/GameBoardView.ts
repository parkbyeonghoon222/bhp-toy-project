import { html, View } from "rune-ts";
import {
  each,
  filter,
  map,
  pipe,
  range,
  tap,
  throwIf,
  toArray,
} from "@fxts/core";
import { words } from "../const/const";

type GameBoardItemVariantType =
  | "disabled"
  | "empty"
  | "entered"
  | "include"
  | "correct"
  | "incorrect";

export type GameBoardItem = {
  char: string;
  index: number;
  variant: GameBoardItemVariantType;
};

export class GameBoardItemView extends View<GameBoardItem> {
  override template() {
    return html` <div class="wordle__box" data-variant="${this.data.variant}">
      ${this.data.char}
    </div>`;
  }

  public setBoardItem(char: string, variant: GameBoardItemVariantType) {
    this.data.char = char;
    this.data.variant = variant;
  }
}

export type GameBoard = {};

export class GameBoardView extends View<GameBoard> {
  tryCnt: number = 0;
  currentIndex: number = 0;
  targetWord: string = "";
  board = pipe(
    range(30),
    map(
      (index) =>
        new GameBoardItemView({
          char: "",
          variant: index < 5 ? "empty" : "disabled",
          index,
        }),
    ),
    toArray,
  );

  override template({}: GameBoard) {
    return html` <div class="wordle__container">${this.board}</div>`;
  }

  // todo: 함수형으로 바꿔보자
  override onRender() {
    this.getWord();
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code.includes("Key")) {
        this.appendBoardItem(e.code.replace("Key", ""));
      } else if (e.code === "Backspace") {
        this.removeBoardItem();
      } else if (e.code === "Enter") {
        this.submitAnswer();
      }
    });
  }

  private setCurrentBoardItem(char: string, variant: GameBoardItemVariantType) {
    this.board[this.currentIndex].setBoardItem(char, variant);
    this.board[this.currentIndex].redraw();
  }

  private appendBoardItem(char: string) {
    if (this.currentIndex < this.tryCnt * 5 + 5) {
      this.setCurrentBoardItem(char, "entered");
      this.currentIndex =
        this.currentIndex + 1 < this.tryCnt * 5 + 5
          ? this.currentIndex + 1
          : this.currentIndex;
    }
  }

  private removeBoardItem() {
    if (this.currentIndex >= this.tryCnt * 5) {
      this.setCurrentBoardItem("", "empty");
      this.currentIndex =
        this.currentIndex - 1 >= this.tryCnt * 5
          ? this.currentIndex - 1
          : this.currentIndex;
    }
  }

  private submitAnswer() {
    pipe(
      this.board,
      filter(
        (board) =>
          board.data.index < this.tryCnt * 5 + 5 &&
          board.data.index >= this.tryCnt * 5 &&
          board.data.char,
      ),
      toArray,
      throwIf((boards) => boards.length !== 5),
      tap((board) => {
        this.tryCnt++;
        this.currentIndex++;

        pipe(
          this.board,
          filter(
            (board) =>
              board.data.index < this.tryCnt * 5 + 5 &&
              board.data.index >= this.tryCnt * 5,
          ),
          each((board) => {
            board.setBoardItem(board.data.char, "empty");
            board.redraw();
          }),
        );
        return board;
      }),
      each((board) => {
        if (board.data.char === this.targetWord[board.data.index % 5]) {
          board.setBoardItem(board.data.char, "correct");
        } else if (this.targetWord.includes(board.data.char)) {
          board.setBoardItem(board.data.char, "include");
        } else {
          board.setBoardItem(board.data.char, "incorrect");
        }
        board.redraw();
      }),
    );
  }

  private getWord() {
    const targetWord =
      localStorage.getItem("marpple-wordle") ||
      words[Math.floor(Math.random() * words.length)];

    localStorage.setItem("marpple-wordle", targetWord);
    this.targetWord = targetWord;
  }
}
