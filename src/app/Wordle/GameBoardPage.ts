import { html, on, View, ListView } from 'rune-ts';
import {GameBoardView} from "./ui/GameBoardView";

export function gameBoardPage() {


  const element = new GameBoardView({code:"#222222"}).render();
  document.querySelector('#wordle')!.append(element);
}
