import { html, Page } from "rune-ts";
import { GameManualView } from "./ui/GameManualView";
import { GameBoardView } from "./ui/GameBoardView";
import "./wordlePage.scss";

export type Wordle = Record<string, string>;

export class WordlePage extends Page<Wordle> {
  override template() {
    return html`
      <main>
        <section id="wordle"></section>
      </main>
    `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());

    document.querySelector("#wordle")!.append(new GameBoardView({}).render());
    document.querySelector("#body")!.append(new GameManualView({}).render());
  }
}
