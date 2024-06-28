import { html, View } from "rune-ts";
import {
  compact,
  each,
  filter,
  map,
  pipe,
  range,
  reduce,
  toArray,
} from "@fxts/core";
import { GameBoardItem, GameBoardItemView } from "./GameBoardItemView";
import { KeyboardSelected } from "./GameKeyboardItemView";
import { GameKeyboardView } from "./GameKeyboardView";
import { client } from "../../../shared";

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

export type GameBoard = {
  targetWord: string;
};

export class GameBoardView extends View<GameBoard> {
  tryCnt: number = 0;
  currentIndex: number = 0;
  targetWord: string =
    localStorage.getItem("marpple__wordle") || this.data.targetWord;
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

  override onRender() {
    localStorage.setItem("marpple__wordle", this.targetWord);

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
    this.getTargetWord()
      .then(() => {
        this.tryCnt = 0;
        this.currentIndex = 0;
        this.gameBoardItemViews = createGameBoard();
        this.gameKeyboardView.resetKeyboard();
        this.redraw();
      })
      .catch((err) => {
        this.targetWord = "ERROR";
        this.tryCnt = 0;
        this.currentIndex = 0;
        this.gameBoardItemViews = createGameBoard();
        this.gameKeyboardView.resetKeyboard();
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

  private isCurrentBoardItem = (boardItem: GameBoardItemView) => {
    return (
      boardItem.data.index < this.tryCnt * 5 + 5 &&
      boardItem.data.index >= this.tryCnt * 5
    );
  };

  private getCurrentSubmitWord() {
    return pipe(
      this.getCurrentBoardItems(),
      filter((boardItem) => !!boardItem.data.char),
      map((board) => board.data.char),
      reduce((prevChar, curChar) => `${prevChar}${curChar}`),
    );
  }

  private getCurrentBoardItems() {
    return pipe(
      this.gameBoardItemViews,
      filter(this.isCurrentBoardItem),
      toArray,
    );
  }

  private changeCurrentBoardItems() {
    return pipe(
      this.getCurrentBoardItems(),
      each((boardItem) => {
        if (boardItem.data.char === this.targetWord[boardItem.data.index % 5]) {
          boardItem.setBoardItem(boardItem.data.char, "correct");
        } else if (this.targetWord.includes(boardItem.data.char)) {
          boardItem.setBoardItem(boardItem.data.char, "include");
        } else {
          boardItem.setBoardItem(boardItem.data.char, "incorrect");
        }
      }),
    );
  }

  private changeNextBoardItems() {
    return pipe(
      this.getCurrentBoardItems(),
      each((boardItem) => {
        boardItem.setBoardItem(boardItem.data.char, "empty");
      }),
    );
  }

  private goNextLine() {
    this.tryCnt++;
    this.currentIndex++;
  }

  private changeKeyboardItemByVariant(
    variant: "include" | "incorrect" | "correct",
  ) {
    pipe(
      this.gameBoardItemViews,
      filter((boardItemView) => boardItemView.data.variant === variant),
      map((boardItemView) =>
        this.gameKeyboardView.getKeyboardItemViewByChar(
          boardItemView.data.char,
        ),
      ),
      compact,
      each((keyboardItemView) => {
        keyboardItemView.setKeyboardItem(variant);
      }),
    );
  }

  private submitAnswer() {
    // 현재 줄의 아이템들 가져오기
    const word = this.getCurrentSubmitWord();

    if (word.length === 5) {
      // 게임 승패 판단
      if (word === this.targetWord) {
        this.winGame();
      } else if (this.tryCnt === 5) {
        this.looseGame();
      }
      // 게임 진행이 계속될 시 현재줄 혹은 다음줄 색깔 변경
      else {
        this.changeCurrentBoardItems();
        this.goNextLine();
        this.changeNextBoardItems();

        // 키보드 색상 변경
        this.changeKeyboardItemByVariant("include");
        this.changeKeyboardItemByVariant("correct");
        this.changeKeyboardItemByVariant("incorrect");
      }
    }
  }

  private async getTargetWord() {
    this.targetWord = await client.getRandomWord.query();
    localStorage.setItem("marpple__wordle", this.targetWord);
    return this.targetWord;
  }
}
