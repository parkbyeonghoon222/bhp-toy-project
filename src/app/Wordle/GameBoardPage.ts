import { GameBoardView } from "./ui/GameBoardView";
import { GameManualView } from "./ui/GameManualView";
import { GameKeyboardView } from "./ui/GameKeyboardView";

export function gameBoardPage() {
  document.querySelector("#wordle")!.append(new GameBoardView({}).render());
  document
    .querySelector("#keyboard")!
    .append(new GameKeyboardView({}).render());

  document.querySelector("#body")!.append(new GameManualView({}).render());
}
