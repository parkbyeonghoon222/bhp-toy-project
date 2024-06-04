import { GameBoardView } from "./ui/GameBoardView";

export function gameBoardPage() {
  const element = new GameBoardView({}).render();
  document.querySelector("#wordle")!.append(element);
}
