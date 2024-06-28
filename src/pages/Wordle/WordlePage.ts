import { html, Page } from "rune-ts";
import { GameManualView } from "../../entities/wordle/ui/GameManualView";
import { GameBoardView } from "../../entities/wordle/ui/GameBoardView";
import "./wordlePage.scss";

export class WordlePage extends Page<{ targetWord: string }> {
  override template() {
    return html`
      <main>
        <section id="wordle"></section>
      </main>
    `;
  }

  override onRender() {
    document.querySelector("#body")!.append(this.element());

    document.querySelector("#wordle")!.append(
      new GameBoardView({
        targetWord: this.data.targetWord,
      }).render(),
    );
    document.querySelector("#body")!.append(new GameManualView({}).render());
  }
}
