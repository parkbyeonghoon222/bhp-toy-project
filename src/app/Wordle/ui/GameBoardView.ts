import { html, View } from "rune-ts";
import {
  each,
  filter,
  map,
  pipe,
  range,
  reduce,
  tap,
  throwIf,
  toArray,
} from "@fxts/core";
import { WORDS } from "../const/const";
import { GameBoardItemVariant, GameBoardItemView } from "./GameBoardItemView";
import { KeyboardSelected } from "./GameKeyboardItemView";
import { GameKeyboardView } from "./GameKeyboardView";

const createGameBoard = () =>
  pipe(
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

export type GameBoard = {};

export class GameBoardView extends View<GameBoard> {
  tryCnt: number = 0;
  currentIndex: number = 0;
  targetWord: string =
    localStorage.getItem("marpple__wordle") || this.getRandomWord();
  board = createGameBoard();
  gameKeyboardView: GameKeyboardView = new GameKeyboardView({});

  override template({}: GameBoard) {
    return html`
      <div class="wordle__container">
        <div class="wordle__game">${this.board}</div>

        <div id="keyboard">${this.gameKeyboardView}</div>
      </div>
    `;
  }

  // todo: 함수형으로 바꿔보자
  override onRender() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code.includes("Key")) {
        this.appendBoardItem(e.code.replace("Key", ""));
      } else if (e.code === "Backspace") {
        this.removeBoardItem();
      } else if (e.code === "Enter") {
        this.submitAnswer();
      }
    });

    this.addEventListener(KeyboardSelected, (e: KeyboardSelected) => {
      if (e.detail.variant === "enter") {
        this.submitAnswer();
      } else if (e.detail.variant === "backspace") {
        this.removeBoardItem();
      } else {
        this.appendBoardItem(e.detail.char);
      }
    });
  }

  private setCurrentBoardItem(char: string, variant: GameBoardItemVariant) {
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

  private resetGame() {
    this.tryCnt = 0;
    this.currentIndex = 0;
    this.board = createGameBoard();
    this.getWord();
    this.redraw();
  }

  private winGame() {
    alert("정답입니다!");
    this.resetGame();
  }

  private looseGame() {
    alert(`오답입니다. 정답은 ${this.targetWord}`);
    this.resetGame();
  }

  // todo: 리팩토링 필요
  private submitAnswer() {
    const word = pipe(
      this.board,
      filter(
        (board) =>
          board.data.index < this.tryCnt * 5 + 5 &&
          board.data.index >= this.tryCnt * 5 &&
          board.data.char,
      ),
      toArray,
      throwIf((boards) => boards.length !== 5),
      tap((boards) => {
        pipe(
          boards,
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
        return boards;
      }),
      tap((boards) => {
        this.tryCnt++;
        this.currentIndex++;
        return boards;
      }),
      tap((boards) => {
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
        return boards;
      }),
      map((board) => board.data.char),
      reduce((prevChar, curChar) => `${prevChar}${curChar}`),
    );

    if (word === this.targetWord) {
      this.winGame();
    }

    if (this.tryCnt >= 6) {
      this.looseGame();
    }
  }

  private getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
  }

  private getWord() {
    const targetWord = this.getRandomWord();

    localStorage.setItem("marpple-wordle", targetWord);
    this.targetWord = targetWord;
  }
}
