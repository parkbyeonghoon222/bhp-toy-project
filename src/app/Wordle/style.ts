import { html, View } from "rune-ts";

export class StyleView extends View<object> {
  override template() {
    return html` <style>
      [data-rune] * {
        box-sizing: content-box;
      }

      #wordle {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .wordle__container {
          width: 350px;

          display: grid;
          grid-template-columns: 62px 62px 62px 62px 62px;
          grid-gap: 5px;
          align-items: center;

          & .wordle__box {
            box-sizing: border-box;

            width: 62px;
            height: 62px;
            border: 2px solid #a2a2a2;
          }
        }
      }
    </style>`;
  }
}
