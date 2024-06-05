import { GameBoardView } from "./ui/GameBoardView";
import { GameManualView } from "./ui/GameManualView";

export function gameBoardPage() {
  document.querySelector("#wordle")!.append(new GameBoardView({}).render());
  document.querySelector("#body")!.append(new GameManualView({}).render());
}
