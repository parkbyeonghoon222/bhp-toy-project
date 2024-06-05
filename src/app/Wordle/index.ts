import { html, Page } from "rune-ts";
import { homePage } from "./HomePage";
import { gameBoardPage } from "./GameBoardPage";
import { StyleView } from "./style";

export type Wordle = Record<string, string>;

export class WordlePage extends Page<Wordle> {
  override template() {
    return html`
      <main>
        ${new StyleView({})}
        <section id="wordle"></section>
        <section id="keyboard"></section>
      </main>
    `;
  }

  override onRender() {
    gameBoardPage();
  }
}

export type Home = Record<string, string>;

export class HomePage extends Page<Home> {
  override template() {
    return html`
      <div>
        ${new StyleView({})}
        <div id="home"></div>
      </div>
    `;
  }

  override onRender() {
    homePage();
  }
}

export const WordleRouter = {
  ["/wordle"]: WordlePage,
  ["/"]: HomePage,
};
