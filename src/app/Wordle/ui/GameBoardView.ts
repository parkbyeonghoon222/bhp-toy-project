import { html, View } from "rune-ts";
import { each, filter, map, pipe, range, reduce, toArray } from "@fxts/core";
import { GameBoardItem, GameBoardItemView } from "./GameBoardItemView";
import { KeyboardSelected } from "./GameKeyboardItemView";
import { GameKeyboardView } from "./GameKeyboardView";

const createGameBoard = () =>
  pipe(
    range(30),
    map(
      (index) =>
        ({
          char: "",
          variant: index < 5 ? "empty" : "disabled",
          index,
        }) as GameBoardItem,
    ),
    map((itemData) => new GameBoardItemView(itemData)),
    toArray,
  );

export type GameBoard = {};

export class GameBoardView extends View<GameBoard> {
  tryCnt: number = 0;
  currentIndex: number = 0;
  targetWord: string = localStorage.getItem("marpple__wordle") || "";
  gameBoardItemViews = createGameBoard();
  gameKeyboardView: GameKeyboardView = new GameKeyboardView({});

  override template({}: GameBoard) {
    return html`
      <div class="wordle__container">
        <div class="wordle__game">${this.gameBoardItemViews}</div>
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

  protected onMount() {
    console.log(this.targetWord);
    if (!this.targetWord) this.getTargetWord();
    super.onMount();
  }

  private getCurrentBoardItem() {
    return this.gameBoardItemViews[this.currentIndex];
  }

  private appendBoardItem(char: string) {
    if (this.currentIndex < this.tryCnt * 5 + 5) {
      this.getCurrentBoardItem().setBoardItem(char, "entered");
      this.currentIndex =
        this.currentIndex + 1 < this.tryCnt * 5 + 5
          ? this.currentIndex + 1
          : this.currentIndex;
    }
  }

  private removeBoardItem() {
    if (this.currentIndex >= this.tryCnt * 5) {
      this.getCurrentBoardItem().setBoardItem("", "empty");
      this.currentIndex =
        this.currentIndex - 1 >= this.tryCnt * 5
          ? this.currentIndex - 1
          : this.currentIndex;
    }
  }

  private resetGame() {
    this.getTargetWord().then(() => {
      this.tryCnt = 0;
      this.currentIndex = 0;
      this.gameBoardItemViews = createGameBoard();
      this.redraw();
    });
  }

  private winGame() {
    alert("정답입니다!");
    this.resetGame();
  }

  private looseGame() {
    alert(`오답입니다. 정답은 ${this.targetWord}`);
    this.resetGame();
  }

  private submitAnswer() {
    // 현재 줄의 아이템들 가져오기
    const submitBoardItems = pipe(
      this.gameBoardItemViews,
      filter(
        (board) =>
          board.data.index < this.tryCnt * 5 + 5 &&
          board.data.index >= this.tryCnt * 5 &&
          board.data.char,
      ),
      toArray,
    );

    if (submitBoardItems.length === 5) {
      // 카운트 증가
      this.tryCnt++;
      this.currentIndex++;

      // 현재줄 색깔 변경
      pipe(
        submitBoardItems,
        each((boardItem) => {
          if (
            boardItem.data.char === this.targetWord[boardItem.data.index % 5]
          ) {
            boardItem.setBoardItem(boardItem.data.char, "correct");
          } else if (this.targetWord.includes(boardItem.data.char)) {
            boardItem.setBoardItem(boardItem.data.char, "include");
          } else {
            boardItem.setBoardItem(boardItem.data.char, "incorrect");
          }
        }),
      );

      // 다음줄 색깔 변경
      pipe(
        this.gameBoardItemViews,
        filter(
          (boardItem) =>
            boardItem.data.index < this.tryCnt * 5 + 5 &&
            boardItem.data.index >= this.tryCnt * 5,
        ),
        each((boardItem) => {
          boardItem.setBoardItem(boardItem.data.char, "empty");
        }),
      );

      // 작성한 word 추출
      const word = pipe(
        submitBoardItems,
        map((board) => board.data.char),
        reduce((prevChar, curChar) => `${prevChar}${curChar}`),
      );

      // 게임 승패 판단
      if (word === this.targetWord) {
        this.winGame();
      } else if (this.tryCnt >= 6) {
        this.looseGame();
      }
    }
  }

  private async getTargetWord() {
    const res = await fetch("http://localhost:8080/words/random");
    const data = await res.json();
    this.targetWord = data.word_name;
    localStorage.setItem("marpple__wordle", data.word_name);
    return this.targetWord;
  }
}
