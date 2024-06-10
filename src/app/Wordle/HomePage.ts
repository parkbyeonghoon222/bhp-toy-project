import { HomeView } from "./ui/HomeView";

export function homePage() {
  const element = new HomeView({}).render();
  document.querySelector("#wordle")!.append(element);
}
